import styled from "styled-components";
import NumbersIcon from "@mui/icons-material/Numbers";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

export default function KPI({ users }) {
  const Styled = {
    KpiWrapper: styled.div`
      display: flex;
      border-radius: 0.5rem;
      width: 50%;
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

    HoverEffect: styled.div`
      white-space: nowrap;
      position: relative;
      display: inline-block;
      &:hover::after {
        content: "${(props) => props.$description}";
        position: absolute;
        bottom: -25px;
        transform: translateX(-40%);
        background-color: ${({ theme }) => theme.colors.grey2};
        color: ${({ theme }) => theme.colors.white};
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 1;
      }
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
          <Styled.HoverEffect $description="aktive User/User">
            <NumbersIcon />
          </Styled.HoverEffect>
          {totalActiveUsers} / {totalUsers}
        </Styled.IconTextWrapper>
        <Styled.IconTextWrapper>
          <Styled.HoverEffect $description="monatlicher AE">
            <CreditScoreIcon />
          </Styled.HoverEffect>
          {(Math.round(payingVolumeMonthly * 100) / 100)
            .toFixed(2)
            .replace(".", ",")}
          €
        </Styled.IconTextWrapper>
      </Styled.KpiWrapper>
    </>
  );
}
