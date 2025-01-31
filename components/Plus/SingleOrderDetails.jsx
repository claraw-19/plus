import styled from "styled-components";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SellIcon from "@mui/icons-material/Sell";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PaymentIcon from "@mui/icons-material/Payment";
import EventIcon from "@mui/icons-material/Event";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function SingleOrderDetails({ singleOrderWithDependencies }) {
  const endDate = singleOrderWithDependencies.singleOrder.cancellationDate
    ? new Date(singleOrderWithDependencies.singleOrder.endDate)
    : new Date(singleOrderWithDependencies.singleOrder.nextPaymentDate);

  const calcCostumerLifetime = (startDate, endDate) => {
    const start = new Date(startDate);
    let yearsDiff = endDate.getFullYear() - start.getFullYear();
    let monthsDiff = endDate.getMonth() - start.getMonth();
    return yearsDiff * 12 + monthsDiff;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Styled.DetailsNameContainer>
      <Styled.IconTextWrapper>
        <PersonIcon />
        <Styled.UserName>
          {singleOrderWithDependencies.user.name}
        </Styled.UserName>
      </Styled.IconTextWrapper>
      <Styled.DetailsContainer>
        <Styled.DetailsData>
          <Styled.IconTextWrapper>
            {singleOrderWithDependencies.singleOrder.status === "active" ? (
              <CheckCircleIcon />
            ) : (
              <HighlightOffIcon />
            )}
            {singleOrderWithDependencies.singleOrder.status === "active"
              ? "Aktiv"
              : "Inaktiv"}
          </Styled.IconTextWrapper>
          <Styled.IconTextWrapper>
            <EmailIcon />
            {singleOrderWithDependencies.user.email}
            <ContentCopyIcon
              onClick={() =>
                copyToClipboard(singleOrderWithDependencies.user.email)
              }
              style={{ cursor: "pointer", marginLeft: "8px" }}
            />
          </Styled.IconTextWrapper>
          <Styled.IconTextWrapper>
            <VpnKeyIcon />
            {singleOrderWithDependencies.singleOrder.accessCodesId}
            <ContentCopyIcon
              onClick={() =>
                copyToClipboard(
                  singleOrderWithDependencies.singleOrder.accessCodesId
                )
              }
              style={{
                cursor: "pointer",
                marginLeft: "8px",
              }}
            />
          </Styled.IconTextWrapper>
          <Styled.IconTextWrapper>
            <Styled.HoverEffect $description="Costumer Lifetime">
              <HourglassEmptyIcon />
            </Styled.HoverEffect>
            {`${calcCostumerLifetime(singleOrderWithDependencies.singleOrder.date, endDate)} ${calcCostumerLifetime(singleOrderWithDependencies.singleOrder.date, endDate) === 1 ? "Monat" : "Monate"}`}
          </Styled.IconTextWrapper>
        </Styled.DetailsData>
        <Styled.DetailsData>
          <Styled.IconTextWrapper>
            <Styled.HoverEffect $description="Startdatum">
              <PlayArrowIcon />
            </Styled.HoverEffect>
            {new Date(
              singleOrderWithDependencies.singleOrder.date
            ).toLocaleDateString("de-DE")}
          </Styled.IconTextWrapper>
          <Styled.IconTextWrapper>
            <Styled.HoverEffect $description="Preis">
              <SellIcon />
            </Styled.HoverEffect>
            {singleOrderWithDependencies.singleOrder.price.toLocaleString(
              "de-DE"
            )}{" "}
            €
          </Styled.IconTextWrapper>
          <Styled.IconTextWrapper>
            <Styled.HoverEffect $description="Zahlungsmethode">
              <PaymentIcon />
            </Styled.HoverEffect>
            {singleOrderWithDependencies.singleOrder.payment}
          </Styled.IconTextWrapper>

          <Styled.IconTextWrapper>
            {singleOrderWithDependencies.singleOrder.status === "active" ? (
              <>
                <Styled.HoverEffect $description="Nächstes Zahlungsdatum">
                  <EventIcon />
                </Styled.HoverEffect>
                {new Date(
                  singleOrderWithDependencies.singleOrder.nextPaymentDate
                ).toLocaleDateString("de-DE")}
              </>
            ) : (
              <>
                <Styled.HoverEffect $description="Enddatum">
                  <EventBusyIcon />
                </Styled.HoverEffect>
                {new Date(
                  singleOrderWithDependencies.singleOrder.endDate
                ).toLocaleDateString("de-DE")}
              </>
            )}
          </Styled.IconTextWrapper>
        </Styled.DetailsData>
        <Styled.DetailsData>
          <Styled.IconTextWrapper>
            <Styled.HoverEffect $description="Klicks gesamt">
              <TouchAppIcon />
            </Styled.HoverEffect>
            {singleOrderWithDependencies.user.allClicks}
          </Styled.IconTextWrapper>
          <Styled.IconTextWrapper>
            <Styled.HoverEffect $description="Klicks 30 Tage">
              <TouchAppIcon />
            </Styled.HoverEffect>
            {singleOrderWithDependencies.user.clicks}
          </Styled.IconTextWrapper>
        </Styled.DetailsData>
      </Styled.DetailsContainer>
    </Styled.DetailsNameContainer>
  );
}

const Styled = {
  DetailsNameContainer: styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 20px 10px 20px;
    border-bottom: 1px solid #ccc;
  `,

  DetailsContainer: styled.div`
    display: flex;
    flex-direction: row;
  `,

  DetailsData: styled.div`
    flex: 1;
  `,

  IconTextWrapper: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    height: 40px;
    padding-bottom: 10px;
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

  UserName: styled.p`
    font-family: roboto-bold;
  `,
};
