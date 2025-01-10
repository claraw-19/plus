import styled from "styled-components";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function UserDetails({ user }) {
  const Styled = {
    DetailsContainer: styled.div`
      display: flex;
      justify-content: space-between;
      padding: 8px 20px;
      border-bottom: 1px solid #ccc;
    `,

    DetailsData: styled.p`
      flex: 1;
    `,

    IconTextWrapper: styled.div`
      display: flex;
      align-items: center;
      gap: 8px;
    `,

    HoverEffect: styled.div`
      position: relative;
      display: inline-block;

      &:hover::after {
        content: "${(props) => props.description}";
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
  return (
    <Styled.DetailsContainer>
      <Styled.DetailsData>
        <Styled.IconTextWrapper>
          <Styled.HoverEffect description="Startdatum">
            <PlayArrowIcon />
          </Styled.HoverEffect>
          {user.date}
        </Styled.IconTextWrapper>
      </Styled.DetailsData>
      <Styled.DetailsData>
        {user.status ? "Aktiv" : "Inaktiv"}
      </Styled.DetailsData>
    </Styled.DetailsContainer>
  );
}
