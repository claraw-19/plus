import styled from "styled-components";

const Styled = {
  UserContainer: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    border-bottom: 1px solid #ccc;
    &:hover {
      background-color: ${({ theme }) => theme.colors.grey7};
    }
  `,

  UserData: styled.p`
    flex: 1;
  `,
};

export default function UserCard({ user }) {
  return (
    <Styled.UserContainer>
      <Styled.UserData>
        {user.firstName} {user.lastName}
      </Styled.UserData>
      <Styled.UserData>{user.email}</Styled.UserData>
      <Styled.UserData>{user.accessCodesId}</Styled.UserData>
      <Styled.UserData>{user.nextPaymentDate}</Styled.UserData>
    </Styled.UserContainer>
  );
}
