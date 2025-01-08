import styled from "styled-components";

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  border-bottom: 1px solid #ccc;
`;

const UserData = styled.p`
  flex: 1;
  font-weight: 900;
`;

export default function UserListHeader() {
  return (
    <UserContainer>
      <UserData>Name</UserData>
      <UserData>E-Mail</UserData>
      <UserData>Lizenzcode</UserData>
      <UserData>Nächstes Zahlungsdatum</UserData>
    </UserContainer>
  );
}
