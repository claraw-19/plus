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
    `,

    StickyHeader: styled.div`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: ${({ theme }) => theme.colors.white};
      z-index: 1;
    `,

    ScrollableContent: styled.div`
      padding-top: 190px;
      overflow-y: auto;
      height: calc(100vh - 190px);
    `,
  };

  return (
    <Styled.ColorWrapper>
      <Styled.StickyHeader>
        <h1>PLUS-Lizenzen</h1>
        <UserListHeader />
      </Styled.StickyHeader>

      <Styled.ScrollableContent>
        <Styled.UserList>
          {users.map((user) => (
            <li key={user.id}>
              <UserCard user={user} />
            </li>
          ))}
        </Styled.UserList>
      </Styled.ScrollableContent>
    </Styled.ColorWrapper>
  );
}
