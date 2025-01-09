import styled from "styled-components";

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey7};
  }
`;

const UserData = styled.p`
  flex: 1;
`;

export default function UserCard({ user }) {
  return (
    <UserContainer>
      <UserData>
        {user.firstName} {user.lastName}
      </UserData>
      <UserData>{user.email}</UserData>
      <UserData>{user.accessCodesId}</UserData>
      <UserData>{user.nextPaymentDate}</UserData>
    </UserContainer>
  );
}
