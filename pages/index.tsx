import users from "../constants/dummyData.json";
import UserCard from "@/components/Plus/UserCard";
import styled from "styled-components";
import UserListHeader from "@/components/Plus/UserListHeader";
import { useState } from "react";
import UserDetails from "@/components/Plus/UserDetails";

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
  const [openUserIds, setOpenUserIds] = useState([]);

  const toggleUserDetails = (userId) => {
    setOpenUserIds((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  return (
    <>
      <Styled.Header>
        <Styled.Heading>PLUS-Lizenzen</Styled.Heading>
        <UserListHeader />
      </Styled.Header>
      <Styled.UserList>
        {users.map((user) => (
          <li key={user.id}>
            <div onClick={() => toggleUserDetails(user.id)}>
              <UserCard user={user} isOpen={openUserIds.includes(user.id)} />
            </div>
            {openUserIds.includes(user.id) && <UserDetails user={user} />}
          </li>
        ))}
      </Styled.UserList>
    </>
  );
}
