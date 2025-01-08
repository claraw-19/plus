import users from "../constants/dummyData.json";
import UserCard from "@/components/Plus/UserCard";
import styled from "styled-components";
import UserListHeader from "@/components/Plus/UserListHeader";

export default function Plus() {
  const Styled = {
    UserList: styled.ul`
      list-style: none;
      margin: 0;
      padding: 0;
    `,

    ColorWrapper: styled.div`
      color: ${({ theme }) => theme.colors.grey2};
      padding-top: 190px;
    `,

    StickyHeader: styled.div`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: ${({ theme }) => theme.colors.white};
      z-index: 10;
    `,
  };

  return (
    <Styled.ColorWrapper>
      <Styled.StickyHeader>
        <h1>PLUS-Lizenzen</h1>
        <UserListHeader />
      </Styled.StickyHeader>
      <Styled.UserList>
        {users.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </Styled.UserList>
    </Styled.ColorWrapper>
  );
}
