import users from "../constants/dummyData.json";
import UserCard from "@/components/Plus/UserCard";
import styled from "styled-components";
import UserListHeader from "@/components/Plus/UserListHeader";
import { useState } from "react";
import UserDetails from "@/components/Plus/UserDetails";

export default function Plus() {
  const [openUserIds, setOpenUserIds] = useState([]);

  console.log("openUserIds: ", openUserIds);

  const toggleUserDetails = (userId) => {
    setOpenUserIds(() => {
      if (openUserIds.includes(userId)) {
        return openUserIds.filter((id) => id !== userId);
      } else {
        return [...openUserIds, userId];
      }
    });
  };

  const Styled = {
    UserList: styled.ul`
      list-style: none;
      margin: 0;
      padding: 0;
      padding-top: 186px;
      overflow-y: auto;
      height: calc(100vh - 190px);
    `,

    StickyHeader: styled.div`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: ${({ theme }) => theme.colors.white};
      z-index: 1;
    `,

    Heading: styled.h1`
      padding: 0 16px;
    `,
  };

  return (
    <>
      <Styled.StickyHeader>
        <Styled.Heading>PLUS-Lizenzen</Styled.Heading>
        <UserListHeader />
      </Styled.StickyHeader>
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
