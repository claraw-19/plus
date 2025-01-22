import { useState } from "react";
import styled, { ThemeContext } from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FilterContainer from "@/components/Plus/FilterContainer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TextField, Button, Input } from "@mui/material";
import SaveButton from "@/components/common/buttons/PrimaryButton";
import { Menu, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";

export default function Filter({
  filters,
  setFilters,
  setSingleOrders,
  allSingleOrdersWithDependencies,
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [viewName, setViewName] = useState("");
  const [savedViews, setSavedViews] = useState([]);
  const [selectedView, setSelectedView] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const theme = useContext(ThemeContext);

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

  const handleOpenPopup = () => {
    setFilters([{ field: "", filterMethod: "", value: "" }]);
    setIsPopupOpen(true);
    setViewName("");
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveView = () => {
    if (!viewName.trim()) {
      alert("Bitte gib einen Namen für die Ansicht ein.");
      return;
    }
    if (isEditMode) {
      const updatedViews = savedViews.map((view) =>
        view.id === selectedView.id
          ? { ...view, name: viewName, filters }
          : view
      );
      setSavedViews(updatedViews);
      setSelectedView({ ...selectedView, name: viewName, filters });
    } else {
      const newView = { name: viewName, id: uuidv4(), filters };
      setSavedViews([...savedViews, newView]);
      setSelectedView(newView);
    }
    setIsEditMode(false);
    setIsPopupOpen(false);
  };

  const handleContextMenu = (event, view) => {
    event.preventDefault();
    setSelectedView(view);
    setContextMenu({
      mouseX: event.clientX,
      mouseY: event.clientY,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleDeleteView = () => {
    const updatedSavedViews = savedViews.filter(
      (view) => view.id !== selectedView.id
    );
    setSavedViews(updatedSavedViews);
    setSelectedView(null);
    handleCloseContextMenu();
    setSingleOrders(allSingleOrdersWithDependencies);
  };

  function updateSelectedView(view) {
    if (!selectedView) {
      setSelectedView(view);
      setFilters(view.filters);
    } else if (selectedView.id === view.id) {
      setSelectedView(null);
      setFilters([]);
    } else {
      setSelectedView(view);
      setFilters(view.filters);
    }
  }

  const handleDuplicateView = () => {
    setViewName(`${selectedView.name} - Copy`);
    setFilters(selectedView.filters);
    setIsPopupOpen(true);
    handleCloseContextMenu();
  };

  const handleEditView = () => {
    setViewName(selectedView.name);
    setFilters(selectedView.filters);
    setIsEditMode(true);
    setIsPopupOpen(true);
    handleCloseContextMenu();
  };

  return (
    <>
      <Styled.SalesViewPanel>
        {savedViews.map((view, index) => (
          <Styled.ViewButton
            $active={view.id === selectedView?.id}
            key={view.id}
            onClick={() => updateSelectedView(view)}
            onContextMenu={(event) => handleContextMenu(event, view)}
          >
            {view.name}
          </Styled.ViewButton>
        ))}
        <Styled.PlaylistAddIcon onClick={handleOpenPopup} />
      </Styled.SalesViewPanel>
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={handleEditView}
          sx={{
            color: "#5A5A5A",
            fontFamily: theme.typography.fontFamily.regular,
          }}
        >
          Bearbeiten
        </MenuItem>
        <MenuItem
          onClick={handleDuplicateView}
          sx={{
            color: "#5A5A5A",
            fontFamily: theme.typography.fontFamily.regular,
          }}
        >
          Duplizieren
        </MenuItem>
        <MenuItem
          onClick={handleDeleteView}
          sx={{
            color: "#5A5A5A",
            fontFamily: theme.typography.fontFamily.regular,
          }}
        >
          Löschen
        </MenuItem>
      </Menu>

      <Modal open={isPopupOpen} onClose={handleClosePopup}>
        <Styled.ModalContent>
          <Input
            label="Ansicht"
            variant="outlined"
            value={viewName}
            onChange={(e) => setViewName(e.target.value)}
            size="small"
            style={{
              width: "300px",
              marginBottom: "20px",
              color: "#5a5a5a",
              fontFamily: theme.typography.fontFamily.regular,
            }}
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
          <Styled.ClearPopupIcon onClick={handleClosePopup} />
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
