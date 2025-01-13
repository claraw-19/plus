import users from "../constants/dummyData.json";
import UserCard from "@/components/Plus/UserCard";
import styled from "styled-components";
import UserListHeader from "@/components/Plus/UserListHeader";
import SearchBar from "@/components/Plus/SearchBar";

const Styled = {
  UserList: styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    height: calc(100vh - 190px);
  `,

  Header: styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 1;
  `,

  Heading: styled.h1`
    padding: 0 16px;
  `,
};

export default function Plus() {
  return (
    <>
      <Styled.Header>
        <Styled.Heading>PLUS-Lizenzen</Styled.Heading>
        <SearchBar />

        <UserListHeader />
      </Styled.Header>
      <Styled.UserList>
        {users.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </Styled.UserList>
    </>
  );
}
