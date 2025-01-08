import Link from "next/link";
import styled from "styled-components";

export default function LogoButton() {
  return (
    <Link href="https://www.schullv.de">
      <Styled.LogoContainer>
        <img height="42px" src="/next-assets/logo.svg" alt="SchulLV Logo" />
      </Styled.LogoContainer>
    </Link>
  );
}

const Styled = {
  LogoContainer: styled.span`
    margin-right: ${({ theme }) => theme.spacing.s};
    cursor: pointer;
    align-self: center;
  `,
};
