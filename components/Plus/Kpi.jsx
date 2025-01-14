import styled from "styled-components";
import NumbersIcon from "@mui/icons-material/Numbers";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

export default function KPI({ users }) {
  const Styled = {
    KpiWrapper: styled.div`
      display: flex;
      border-radius: 0.5rem;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.schullv4};
      justify-content: space-between;
      align-items: center;
      padding: 10px;
    `,

    IconTextWrapper: styled.div`
      display: flex;
      align-items: center;
      gap: 8px;
    `,
  };
  const totalUsers = users.length;

  const totalActiveUsers = users.filter(
    (user) => user.status === "active"
  ).length;

  const payingVolumeMonthly = users.reduce((total, user) => {
    if (user.status === "active") {
      const price = parseFloat(user.price.replace(",", "."));
      return total + price;
    }
    return total;
  }, 0);

  return (
    <>
      <Styled.KpiWrapper>
        <Styled.IconTextWrapper>
          <NumbersIcon />
          {totalActiveUsers} / {totalUsers}
        </Styled.IconTextWrapper>
        <Styled.IconTextWrapper>
          <CreditScoreIcon />
          {Math.round(payingVolumeMonthly * 100) / 100} €
        </Styled.IconTextWrapper>
      </Styled.KpiWrapper>
    </>
  );
}
