import users from "../constants/dummyData.json";
import UserCard from "@/components/Plus/UserCard";
import styled from "styled-components";
import UserListHeader from "@/components/Plus/UserListHeader";
import SearchBar from "@/components/Plus/SearchBar";
import { useState } from "react";
import KPI from "@/components/Plus/Kpi";

const Styled = {
  UserList: styled.ul`
    list-style: none;
    margin: 0;
    padding: 0 16px;
    overflow-y: auto;
    height: calc(100vh - 190px);
  `,

  Header: styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 1;
    padding: 0 16px;
  `,

  KPIAndSearchWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 0;
    gap: 1rem;
  `,
};

export default function Plus() {
  const [filteredUsers, setFilteredUsers] = useState(users);

  return (
    <>
      <Styled.Header>
        <h1>PLUS-Lizenzen</h1>
        <Styled.KPIAndSearchWrapper>
          <SearchBar users={users} onSearch={setFilteredUsers} />
          <KPI />
        </Styled.KPIAndSearchWrapper>

        <UserListHeader />
      </Styled.Header>
      <Styled.UserList>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))
        ) : (
          <p>Keine User gefunden.</p>
        )}
      </Styled.UserList>
    </>
  );
}
