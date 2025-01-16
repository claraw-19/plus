import styled from "styled-components";

const Styled = {
  UserContainer: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray4};
    }
  `,

  UserData: styled.p`
    flex: 1;
    font-family: roboto-bold;
  `,
};

export default function UserListHeader() {
  return (
    <Styled.UserContainer>
      <Styled.UserData>Name</Styled.UserData>
      <Styled.UserData>E-Mail</Styled.UserData>
      <Styled.UserData>Lizenzcode</Styled.UserData>
      <Styled.UserData>Nächstes Zahlungsdatum</Styled.UserData>
    </Styled.UserContainer>
  );
}
