import users from "../constants/dummyData.json";
import UserCard from "@/components/UserCard";
import styled from "styled-components";

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
        {users.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </UserList>
    </>
  );
}
