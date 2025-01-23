import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styled, { ThemeContext } from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import filterFields from "@/constants/filterFields.json";
import filterMethods from "@/constants/filterMethods.json";
import { useContext } from "react";

export default function FilterContainer({ filter, setFilter, onDelete }) {
  const theme = useContext(ThemeContext);
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
          value={filter.field}
          onChange={(e) => setFilter({ ...filter, field: e.target.value })}
          label="Feld"
          sx={{
            color: "#5A5A5A",
            fontFamily: theme.typography.fontFamily.regular,
          }}
        >
          {filterFields.map((field) => (
            <MenuItem
              key={field.name + field.object}
              value={field}
              sx={{
                color: "#5A5A5A",
                fontFamily: theme.typography.fontFamily.regular,
              }}
            >
              {field.display}
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
          value={filter.filterMethod}
          onChange={(e) =>
            setFilter({ ...filter, filterMethod: e.target.value })
          }
          label="Filtermethode"
          sx={{
            color: "#5A5A5A",
            fontFamily: theme.typography.fontFamily.regular,
          }}
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
                <MenuItem
                  value={method}
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
