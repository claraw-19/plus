import styled from "styled-components";
import UserDetails from "./UserDetails";
import { useState } from "react";

const Styled = {
  UserContainer: styled.button`
    all: unset;
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    background-color: ${({ $isOpen, theme }) =>
      $isOpen ? theme.colors.grey7 : theme.colors.white};
    cursor: pointer;
    width: 100%;
    &:hover {
      background-color: ${({ theme }) => theme.colors.grey7};
    }
  `,

  UserData: styled.p`
    flex: 1;
  `,
};

export default function UserCard({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <Styled.UserContainer $isOpen={isOpen} onClick={toggleDetails}>
        <Styled.UserData>
          {user.firstName} {user.lastName}
        </Styled.UserData>
        <Styled.UserData>{user.email}</Styled.UserData>
        <Styled.UserData>{user.accessCodesId}</Styled.UserData>
        <Styled.UserData>
          {new Date(user.nextPaymentDate).toLocaleDateString("de-DE")}
        </Styled.UserData>
      </Styled.UserContainer>
      {isOpen && <UserDetails user={user} />}
    </>
  );
}
