import { useState } from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FilterContainer from "@/components/Plus/FilterContainer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TextField, Button } from "@mui/material";
import SaveButton from "@/components/common/buttons/PrimaryButton";

export default function Filter({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewName, setViewName] = useState("");
  const [savedViews, setSavedViews] = useState([]);

  const handleAddFilter = () => {
    setFilters([...filters, { field: "", filterMethod: "", value: "" }]);
  };

  const handleFilterChange = (index, updatedFilter) => {
    const newFilters = [...filters];
    newFilters[index] = updatedFilter;
    setFilters(newFilters);
  };

  const handleDeleteFilter = (index) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
  };

  const handleOpen = () => {
    setFilters([{ field: "", filterMethod: "", value: "" }]);
    setIsOpen(true);
    setViewName("");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSaveView = () => {
    if (!viewName.trim()) {
      alert("Bitte geben Sie einen Namen für die Ansicht ein.");
      return;
    }
    setSavedViews([...savedViews, { name: viewName, filters }]);
    setIsOpen(false);
  };

  return (
    <>
      <Styled.SalesViewPanel>
        {savedViews.map((view, index) => (
          <Styled.ViewButton $active={view.id === index} key={view.id}>
            {view.name}
          </Styled.ViewButton>
        ))}
        <Styled.PlaylistAddIcon onClick={handleOpen} />
      </Styled.SalesViewPanel>

      <Modal open={isOpen} onClose={handleClose}>
        <Styled.ModalContent>
          <TextField
            label="Ansicht"
            variant="outlined"
            value={viewName}
            onChange={(e) => setViewName(e.target.value)}
            size="small"
            style={{ width: "300px", marginBottom: "20px" }}
          />
          {filters.map((filter, index) => (
            <FilterContainer
              key={index}
              filter={filter}
              setFilter={(newFilter) => handleFilterChange(index, newFilter)}
              onDelete={() => handleDeleteFilter(index)}
            />
          ))}
          <Styled.AddCircleIcon onClick={handleAddFilter} />
          <div style={{ marginTop: "20px", textAlign: "right" }}>
            <SaveButton title="Speichern" onClick={handleSaveView} />
          </div>
          <Styled.ClearPopupIcon onClick={handleClose} />
        </Styled.ModalContent>
      </Modal>
    </>
  );
}

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
    color: ${({ theme }) => theme.colors.grey2};
  `,

  AddCircleIcon: styled(AddCircleIcon)`
    font-size: 2rem;
    cursor: pointer;
    padding: 15px 0;
    color: ${({ theme }) => theme.colors.grey2};
  `,

  SavedViewButton: styled(Button)`
    margin: 5px;
    text-transform: none;
    background-color: ${({ theme }) => theme.colors.grey7};
    &:hover {
      background-color: ${({ theme }) => theme.colors.grey6};
    }
  `,

  SalesViewPanel: styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: ${({ theme }) => `0 ${theme.spacing.xs} ${theme.spacing.s}`};
    gap: ${({ theme }) => theme.spacing.xxs};
  `,

  ViewButton: styled.div`
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.schullv4 : theme.colors.grey7};
    padding: ${({ theme }) => theme.spacing.xxs};
    border-radius: 0.5rem;
    border: 2px solid
      ${({ theme, $active }) =>
        $active ? theme.colors.schullv1 : theme.colors.grey4};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme, $active }) =>
        $active ? theme.colors.schullv4 : theme.colors.grey7};
      border-color: ${({ theme, $active }) =>
        $active ? theme.colors.schullv2 : theme.colors.grey5};
      transition: all 0.2s ease-in-out;
    }
  `,
};
