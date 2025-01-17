import { useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FilterContainer from "./FilterContainer";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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

  AddCircleIcon: styled(AddCircleIcon)`
    font-size: 2rem;
    cursor: pointer;
    padding: 15px 0;
  `,
};

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);

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
          <h3>Neuer Filter</h3>
          <FilterContainer />
          <Styled.AddCircleIcon />
          <Styled.ClearPopupIcon onClick={handleClose} />
        </Styled.ModalContent>
      </Modal>
    </>
  );
}
