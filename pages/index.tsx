import users from "../constants/dummyData.json";
import UserCard from "@/components/Plus/UserCard";
import styled from "styled-components";
import { UserContainer } from "@/components/Plus/UserCard";
import { UserData } from "@/components/Plus/UserCard";
import UserListHeader from "@/components/Plus/UserListHeader";

export default function Plus() {
  const UserList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
  `;

  return (
    <>
      <h1>PLUS-Lizenzen</h1>
      <UserList>
        <UserListHeader />
        {users.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </UserList>
    </>
  );
}
