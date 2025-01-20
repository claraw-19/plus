import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import filterFields from "@/constants/filterFields.json";

export default function FilterContainer({
  field,
  setField,
  filterMethod,
  setFilterMethod,
  value,
  setValue,
  onDelete,
}) {
  const Styled = {
    ClearFilterIcon: styled(ClearIcon)`
      font-size: 1.2rem;
      cursor: pointer;
      color: ${({ theme }) => theme.colors.grey2};
    `,

    Container: styled.div`
      display: flex;
      gap: 15px;
      margin-top: 20px;
      align-items: center;
    `,

    InputLabel: styled(InputLabel)`
      color: ${({ theme }) => theme.colors.grey2};
    `,
  };

  return (
    <Styled.Container>
      <FormControl fullWidth>
        <Styled.InputLabel>Feld</Styled.InputLabel>
        <Select
          value={field}
          onChange={(e) => setField(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled style={{ display: "none" }}>
            Feld
          </MenuItem>
          {filterFields.map((field) => (
            <MenuItem key={field.name} value={field.name}>
              {field.diplay}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Styled.InputLabel>Filtermethode</Styled.InputLabel>
        <Select
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled style={{ display: "none" }}>
            Filtermethode
          </MenuItem>
          <MenuItem value="notEmpty">ist nicht leer</MenuItem>
          <MenuItem value="empty">ist leer</MenuItem>
          <MenuItem value="notEqual">ist nicht gleich</MenuItem>
          <MenuItem value="equals">ist gleich</MenuItem>
          <MenuItem value="contains">enthält</MenuItem>
          <MenuItem value="containsNot">enthält nicht</MenuItem>
          <MenuItem value="startsWith">beginnt mit</MenuItem>
          <MenuItem value="lessEqual">ist kleiner gleich</MenuItem>
          <MenuItem value="greaterEqual">ist größer gleich</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Wert"
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
      />
      <Styled.ClearFilterIcon onClick={onDelete} />
    </Styled.Container>
  );
}
