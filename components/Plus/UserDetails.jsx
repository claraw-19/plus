import styled from "styled-components";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SellIcon from "@mui/icons-material/Sell";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PaymentIcon from "@mui/icons-material/Payment";
import EventIcon from "@mui/icons-material/Event";

const Styled = {
  DetailsContainer: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 20px 0 20px;
    border-bottom: 1px solid #ccc;
  `,

  DetailsData: styled.p`
    flex: 1;
  `,

  IconTextWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  `,

  HoverEffect: styled.div`
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

export default function UserDetails({ user }) {
  const endDate = new Date();
  const calcCostumerLifetime = (startDate, endDate) => {
    const start = new Date(startDate);
    let yearsDiff = endDate.getFullYear() - start.getFullYear();
    let monthsDiff = endDate.getMonth() - start.getMonth();
    if (monthsDiff < 0) {
      yearsDiff -= 1;
      monthsDiff += 12;
    }
    return { years: yearsDiff, months: monthsDiff };
  };

  return (
    <Styled.DetailsContainer>
      <Styled.DetailsData>
        <Styled.IconTextWrapper>
          <Styled.HoverEffect $description="Startdatum">
            <PlayArrowIcon />
          </Styled.HoverEffect>
          {new Date(user.date).toLocaleDateString("de-DE")}
        </Styled.IconTextWrapper>
        <Styled.IconTextWrapper>
          <Styled.HoverEffect $description="Preis">
            <SellIcon />
          </Styled.HoverEffect>
          {user.price.toLocaleString("de-DE")} €
        </Styled.IconTextWrapper>
        <Styled.IconTextWrapper>
          <Styled.HoverEffect $description="Zahlungsmethode">
            <PaymentIcon />
          </Styled.HoverEffect>
          {user.payment}
        </Styled.IconTextWrapper>
        <Styled.IconTextWrapper>
          <Styled.HoverEffect $description="Nächstes Zahlungsdatum">
            <EventIcon />
          </Styled.HoverEffect>
          {new Date(user.nextPaymentDate).toLocaleDateString("de-DE")}
        </Styled.IconTextWrapper>
      </Styled.DetailsData>
      <Styled.DetailsData>
        <Styled.IconTextWrapper>
          <Styled.IconTextWrapper>
            {`${calcCostumerLifetime(user.date, endDate).years} Jahre ${calcCostumerLifetime(user.date, endDate).months} Monate`}
          </Styled.IconTextWrapper>
        </Styled.IconTextWrapper>
      </Styled.DetailsData>
      <Styled.DetailsData>
        <Styled.IconTextWrapper>
          {user.status === "active" ? (
            <CheckCircleIcon />
          ) : (
            <HighlightOffIcon />
          )}
          {user.status === "active" ? "Aktiv" : "Inaktiv"}
        </Styled.IconTextWrapper>
      </Styled.DetailsData>
    </Styled.DetailsContainer>
  );
}
