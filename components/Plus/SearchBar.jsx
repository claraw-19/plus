import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import Fuse from "fuse.js";

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

export default function SearchBar({ singleOrdersWithDependencies, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      onSearch(singleOrdersWithDependencies);
      return;
    }

    const fuse = new Fuse(singleOrdersWithDependencies, {
      keys: [
        "user.firstName",
        "user.lastName",
        {
          name: "combinedName",
          getFn: (singleOrderWithDependencies) =>
            `${singleOrderWithDependencies.user.firstName} ${singleOrderWithDependencies.user.lastName}`,
        },
        "accessCodesId",
      ],
      threshold: 0.1,
    });

    const searchResults = fuse.search(value).map((result) => result.item);
    onSearch(searchResults);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch(singleOrdersWithDependencies);
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
