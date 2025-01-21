import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import filterFields from "@/constants/filterFields.json";
import filterMethods from "@/constants/filterMethods.json";

export default function FilterContainer({ filter, setFilter, onDelete }) {
  console.log(filter);

  return (
    <Styled.Container>
      <FormControl fullWidth>
        <Styled.InputLabel>Feld</Styled.InputLabel>
        <Select
          value={filter.field}
          onChange={(e) => setFilter({ ...filter, field: e.target.value })}
          displayEmpty
        >
          <MenuItem
            value=""
            key="placeholder-field"
            disabled
            style={{ display: "none" }}
          >
            Feld
          </MenuItem>
          {filterFields.map((field) => (
            <MenuItem key={field.name + field.object} value={field}>
              {field.display}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <Styled.InputLabel>Filtermethode</Styled.InputLabel>
        <Select
          value={filter.filterMethod}
          onChange={(e) =>
            setFilter({ ...filter, filterMethod: e.target.value })
          }
          displayEmpty
        >
          <MenuItem
            value=""
            key="placeholder-method"
            disabled
            style={{ display: "none" }}
          >
            Filtermethode
          </MenuItem>
          {filter?.field?.type &&
            filterMethods
              .filter((method) =>
                method.supportedTypes.includes(filter.field.type)
              )
              .map((method) => (
                <MenuItem value={method} key={method.name}>
                  {method.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
      <TextField
        label="Wert"
        variant="outlined"
        value={filter.value}
        onChange={(e) => setFilter({ ...filter, value: e.target.value })}
        fullWidth
      />
      <Styled.ClearFilterIcon onClick={onDelete} />
    </Styled.Container>
  );
}

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
