import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

export default function FilterContainer() {
  const [field, setField] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [value, setValue] = useState("");

  const Styled = {
    ClearFilterIcon: styled(ClearIcon)`
      font-size: 1.2rem;
      cursor: pointer;
    `,

    Container: styled.div`
      display: flex;
      gap: 15px;
      margin-top: 20px;
      align-items: center;
    `,
  };

  return (
    <Styled.Container>
      <FormControl fullWidth>
        <InputLabel>Feld</InputLabel>
        <Select
          value={field}
          onChange={(e) => setField(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled style={{ display: "none" }}>
            Feld
          </MenuItem>
          <MenuItem value="Name">Name</MenuItem>
          <MenuItem value="Email">Email</MenuItem>
          <MenuItem value="Status">Status</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Filtermethode</InputLabel>
        <Select
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          displayEmpty
        >
          <MenuItem value="" disabled style={{ display: "none" }}>
            Filtermethode
          </MenuItem>
          <MenuItem value="equals">Gleich</MenuItem>
          <MenuItem value="contains">Enthält</MenuItem>
          <MenuItem value="startsWith">Beginnt mit</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Wert"
        variant="outlined"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
      />
      <Styled.ClearFilterIcon />
    </Styled.Container>
  );
}
