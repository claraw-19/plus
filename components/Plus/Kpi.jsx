import styled from "styled-components";
import NumbersIcon from "@mui/icons-material/Numbers";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { useMemo } from "react";

export default function KPI({ singleOrdersWithDependencies }) {
  const totalSingleOrders = singleOrdersWithDependencies.length;

  const totalActiveSingleOrders = useMemo(
    () =>
      singleOrdersWithDependencies.filter(
        (singleOrderWithDependencies) =>
          singleOrderWithDependencies.singleOrder.status === "active"
      ).length,
    [singleOrdersWithDependencies]
  );

  const payingVolumeMonthly = useMemo(
    () =>
      singleOrdersWithDependencies.reduce(
        (total, singleOrderWithDependencies) => {
          if (singleOrderWithDependencies.singleOrder.status === "active") {
            const price = singleOrderWithDependencies.singleOrder.price;
            return total + price;
          }
          return total;
        },
        0
      ),
    [singleOrdersWithDependencies]
  );

  const calcAverageCostumerLifetime = useMemo(
    () =>
      singleOrdersWithDependencies.reduce(
        (total, singleOrderWithDependencies) => {
          const start = new Date(singleOrderWithDependencies.singleOrder.date);
          const endDate = singleOrderWithDependencies.singleOrder
            .cancellationDate
            ? new Date(singleOrderWithDependencies.singleOrder.endDate)
            : new Date(singleOrderWithDependencies.singleOrder.nextPaymentDate);
          let yearsDiff = endDate.getFullYear() - start.getFullYear();
          let monthsDiff = endDate.getMonth() - start.getMonth();
          const costumerLifetime = yearsDiff * 12 + monthsDiff;
          return total + costumerLifetime;
        },
        0
      ) / singleOrdersWithDependencies.length,
    [singleOrdersWithDependencies]
  );

  return (
    <>
      <Styled.KpiWrapper>
        <Styled.IconTextWrapper>
          <Styled.HoverEffect $description="aktive User/User">
            <NumbersIcon />
          </Styled.HoverEffect>
          {totalActiveSingleOrders} / {totalSingleOrders}
        </Styled.IconTextWrapper>
        <Styled.IconTextWrapper>
          <Styled.HoverEffect $description="⌀ Costumer Lifetime">
            <HourglassEmptyIcon />
          </Styled.HoverEffect>
          {singleOrdersWithDependencies.length > 0
            ? `${Math.round(calcAverageCostumerLifetime)} ${Math.round(calcAverageCostumerLifetime) === 1 ? "Monat" : "Monate"}`
            : "0 Monate"}
        </Styled.IconTextWrapper>
        <Styled.IconTextWrapper>
          <Styled.HoverEffect $description="monatlicher AE">
            <CreditScoreIcon />
          </Styled.HoverEffect>
          {(Math.round(payingVolumeMonthly * 100) / 100)
            .toFixed(2)
            .replace(".", ",")}{" "}
          €
        </Styled.IconTextWrapper>
      </Styled.KpiWrapper>
    </>
  );
}

const Styled = {
  KpiWrapper: styled.div`
    display: flex;
    border-radius: 0.5rem;
    min-width: 350px;
    max-width: 400px;
    background-color: ${({ theme }) => theme.colors.schullv4};
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    flex: 1;
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
