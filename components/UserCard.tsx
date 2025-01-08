import styled from "styled-components";

export default function UserCard({ user }) {
  const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    border-bottom: 1px solid #ccc;
  `;

  return (
    <CardContainer>
      <p>
        {user.firstName} {user.lastName}
      </p>
      <p>{user.accessCodesId}</p>
      <p>{user.nextPaymentDate ? user.nextPaymentDate : "------"}</p>
    </CardContainer>
  );
}
