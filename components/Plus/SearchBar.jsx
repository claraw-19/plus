import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
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
      margin-left: 0.25rem;
    `,
  };
  return (
    <Styled.SearchWrapper>
      <SearchIcon />
      <Styled.SearchInput type="text" placeholder="Suchen..." />
    </Styled.SearchWrapper>
  );
}
