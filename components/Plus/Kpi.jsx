import styled from "styled-components";

export default function KPI({ users }) {
  const Styled = {
    KpiWrapper: styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.schullv4};
    `,
  };
  const totalUsers = users.length;

  const totalActiveUsers = users.filter(
    (user) => user.status === "active"
  ).length;

  return (
    <Styled.KpiWrapper>
      {totalActiveUsers} / {totalUsers}
    </Styled.KpiWrapper>
  );
}
