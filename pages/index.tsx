import users from "../constants/dummyData.json";
import UserCard from "@/components/Plus/UserCard";
import styled from "styled-components";
import UserListHeader from "@/components/Plus/UserListHeader";
import { useState } from "react";
import UserDetails from "@/components/Plus/UserDetails";

export default function Plus() {
  const [openUserIds, setOpenUserIds] = useState([]);

  console.log("openUserIds: ", openUserIds);
  console.log(users);

  const toggleUserDetails = (userId) => {
    console.log("Hello");
    setOpenUserIds((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const Styled = {
    UserList: styled.div`
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

  return (
    <>
      <Styled.Header>
        <Styled.Heading>PLUS-Lizenzen</Styled.Heading>
        <UserListHeader />
      </Styled.Header>
      <Styled.UserList>
        {users.map((user) => (
          <div key={user.id}>
            <div onClick={() => toggleUserDetails(user.id)}>
              <UserCard user={user} isOpen={openUserIds.includes(user.id)} />
            </div>
            {openUserIds.includes(user.id) && <UserDetails user={user} />}
          </div>
        ))}
      </Styled.UserList>
    </>
  );
}
