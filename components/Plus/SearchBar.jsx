import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import Fuse from "fuse.js";

const Styled = {
  SearchWrapper: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem 0;
    border-radius: 0.5rem;
    background-color: ${({ theme }) => theme.colors.white};
    border: 1.5px solid ${({ theme }) => theme.colors.grey6};
    width: 100%;
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
    margin-left: 0.25;
  `,

  SearchIcon: styled(SearchIcon)`
    margin-left: 1rem;
  `,
};

export default function SearchBar({ users, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const fuse = new Fuse(users, {
      keys: [
        "firstName",
        "lastName",
        {
          name: "combinedName",
          getFn: (user) => `${user.firstName} ${user.lastName}`,
        },
        "accessCodesId",
      ],
      threshold: 0.1,
    });

    const filteredUsers = value.trim()
      ? fuse.search(value).map((result) => result.item)
      : users;

    onSearch(filteredUsers);
  };

  return (
    <Styled.SearchWrapper>
      <Styled.SearchIcon />
      <Styled.SearchInput
        type="text"
        placeholder="Suchen..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </Styled.SearchWrapper>
  );
}
