import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    box-shadow: 24px;
    padding: 20px;
    border-radius: 8px;
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
          <h2>Popup geöffnet!</h2>
          <button onClick={handleClose}>Schließen</button>
        </Styled.ModalContent>
      </Modal>
    </>
  );
}
