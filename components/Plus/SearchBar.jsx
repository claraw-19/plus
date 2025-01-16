import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Fuse from "fuse.js";
import { ClearIcon } from "@mui/x-date-pickers";

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
    margin-left: 0.25;
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

    const fuse = new Fuse(singleOrdersWithDependencies, {
      keys: [
        "firstName",
        "lastName",
        {
          name: "combinedName",
          getFn: (singleOrderWithDependencies) =>
            `${singleOrderWithDependencies.firstName} ${singleOrderWithDependencies.lastName}`,
        },
        "accessCodesId",
      ],
      threshold: 0.1,
    });

    const singleOrdersWithDependencies = value.trim()
      ? fuse.search(value).map((result) => result.item)
      : singleOrdersWithDependencies;

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
      {searchTerm && (
        <Styled.ClearSearchIcon
          onClick={() => {
            setSearchTerm("");
            onSearch(singleOrdersWithDependencies);
          }}
        />
      )}
    </Styled.SearchWrapper>
  );
}
