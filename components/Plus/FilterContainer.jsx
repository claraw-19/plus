import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styled, { ThemeContext } from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import filterFields from "@/constants/allColumns.json";
import filterMethods from "@/constants/filterMethods.json";
import { useContext, useState } from "react";

export default function FilterContainer({ filter, setFilter, onDelete }) {
  const theme = useContext(ThemeContext);
  console.log("filter:", filter);
  console.log(filter.filterMethod.id);
  const [field, setField] = useState(1);
  return (
    <Styled.Container>
      <FormControl fullWidth variant="outlined">
        <InputLabel
          id="select-label"
          sx={{
            color: "#5A5A5A",
            fontFamily: theme.typography.fontFamily.regular,
          }}
          shrink={Boolean(filter.field)}
        >
          Feld
        </InputLabel>
        <Select
          labelId="select-label"
          value={filter.field.key}
          onChange={(e) => {
            const field = filterFields.filter(
              (field) => field.key === e.target.value
            )[0];
            setFilter({ ...filter, field });
          }}
          label="Feld"
          sx={{
            color: "#5A5A5A",
            fontFamily: theme.typography.fontFamily.regular,
          }}
        >
          {filterFields.map((field) => (
            <MenuItem
              key={field.key}
              value={field.key}
              sx={{
                color: "#5A5A5A",
                fontFamily: theme.typography.fontFamily.regular,
              }}
            >
              {field.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined">
        <InputLabel
          id="filter-method-label"
          sx={{
            color: "#5A5A5A",
            fontFamily: theme.typography.fontFamily.regular,
          }}
        >
          Filtermethode
        </InputLabel>
        <Select
          labelId="filter-method-label"
          value={filter.filterMethod.key}
          onChange={(e) => {
            const filterMethod = filterMethods.filter(
              (method) => method.key === e.target.value
            )[0];
            setFilter({ ...filter, filterMethod });
          }}
          label="Filtermethode"
          sx={{
            color: "#5A5A5A",
            fontFamily: theme.typography.fontFamily.regular,
          }}
        >
          {filter?.field?.type &&
            filterMethods
              .filter((method) =>
                method.supportedTypes.includes(filter.field.type)
              )
              .map((method) => (
                <MenuItem
                  value={method.key}
                  key={method.name}
                  sx={{
                    color: "#5A5A5A",
                    fontFamily: theme.typography.fontFamily.regular,
                  }}
                >
                  {method.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>

      <TextField
        InputProps={{
          sx: {
            color: "#5a5a5a",
            fontFamily: theme.typography.fontFamily.regular,
          },
        }}
        InputLabelProps={{
          sx: {
            color: "#5a5a5a",
            fontFamily: theme.typography.fontFamily.regular,
          },
        }}
        label="Wert"
        variant="outlined"
        value={filter.value}
        onChange={(e) => setFilter({ ...filter, value: e.target.value })}
        fullWidth
        disabled={
          filter.filterMethod.id === "isNotEmpty" ||
          filter.filterMethod.id === "isEmpty"
        }
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
