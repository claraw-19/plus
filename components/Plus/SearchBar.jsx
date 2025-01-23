import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Styled.SearchWrapper>
      <SearchIcon />
      <Styled.SearchInput
        type="text"
        placeholder="Suchen..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && <Styled.ClearSearchIcon onClick={handleClearSearch} />}
    </Styled.SearchWrapper>
  );
}

const Styled = {
  SearchWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.white};
    border: 1.5px solid ${({ theme }) => theme.colors.grey6};
    flex: 1;
    max-width: 100%;
  `,

  SearchInput: styled.input`
    width: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.grey2};
    margin-left: 0.25rem;
  `,

  ClearSearchIcon: styled(ClearIcon)`
    font-size: 1.2rem;
    cursor: pointer;
  `,
};
