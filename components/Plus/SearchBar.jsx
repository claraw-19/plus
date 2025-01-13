import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
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
    margin: 0 0.5rem;
    border: 1.5px solid ${({ theme }) => theme.colors.grey6};
    width: 90%;
    transition:
      background-color 0.2s ease-out,
      width 1.2s ease-out;
  `,

  SearchInput: styled.input`
    width: 100%;
    border: none;
    outline: none;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.grey2};
    margin-left: 0.25rem;
  `,
};

export default function SearchBar({ users, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    const fuse = new Fuse(users, {
      keys: ["firstName", "lastName"],
    });

    const filteredUsers = event.target.value.trim()
      ? fuse.search(event.target.value).map((result) => result.item)
      : users;

    onSearch(filteredUsers);
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
    </Styled.SearchWrapper>
  );
}
