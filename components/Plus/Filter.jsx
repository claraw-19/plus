import { useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import TextField from "@mui/material/TextField";

const Styled = {
  PlaylistAddIcon: styled(PlaylistAddIcon)`
    font-size: 2rem;
    padding: 10px;

    cursor: pointer;
    &:hover {
      border-radius: 100%;
      background-color: ${({ theme }) => theme.colors.grey7};
    }
  `,

  InputContainer: styled.div`
    display: flex;
    gap: 15px;
    margin-top: 20px;
  `,

  ModalContent: styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    background-color: white;
    box-shadow: 24px;
    padding: 20px;
    border-radius: 8px;
  `,

  ClearPopupIcon: styled(ClearIcon)`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.2rem;
    cursor: pointer;
  `,
};

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const [field, setField] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [value, setValue] = useState("");

  const handleAddFilter = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Styled.PlaylistAddIcon onClick={handleAddFilter} />
      <Modal open={isOpen} onClose={handleClose}>
        <Styled.ModalContent>
          <Styled.InputContainer>
            <Select
              value={field}
              onChange={(e) => setField(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled style={{ display: "none" }}>
                Feld
              </MenuItem>
              <MenuItem value="Name">Name</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Status">Status</MenuItem>
            </Select>
            <Select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled style={{ display: "none" }}>
                Filtermethode
              </MenuItem>
              <MenuItem value="equals">Gleich</MenuItem>
              <MenuItem value="contains">Enthält</MenuItem>
              <MenuItem value="startsWith">Beginnt mit</MenuItem>
            </Select>
            <TextField
              label="Wert"
              variant="outlined"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              fullWidth
            />
          </Styled.InputContainer>
          <Styled.ClearPopupIcon onClick={handleClose} />
        </Styled.ModalContent>
      </Modal>
    </>
  );
}
