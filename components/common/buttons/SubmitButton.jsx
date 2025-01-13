import styled from "styled-components";

import ButtonBase from "@mui/material/ButtonBase";
import CircularProgress from "@mui/material/CircularProgress";

export default function SubmitButton({ buttonTitle, isLoading, disabled }) {
  return (
    <Styled.AcceptButton type="submit" disabled={disabled || isLoading}>
      {isLoading ? (
        <Styled.CircularProgressWrapper>
          <Styled.CircularProgress size={34} />
        </Styled.CircularProgressWrapper>
      ) : (
        <>{buttonTitle}</>
      )}
    </Styled.AcceptButton>
  );
}

const Styled = {
  CircularProgressWrapper: styled.div`
    padding: ${({ theme }) => theme.spacing.xs} 0;
  `,

  CircularProgress: styled(CircularProgress)`
    color: white !important;
  `,

  AcceptButton: styled(ButtonBase)`
    display: flex !important;
    color: ${({ theme }) => theme.colors.white} !important;
    background: ${({ theme }) => theme.colors.tintColor} !important;
    &:hover {
      background: ${({ theme }) => theme.colors.tintColorHover} !important;
    }
    text-transform: initial !important;
    font-size: ${({ theme }) => theme.typography.fontSize.m} !important;
    font-family: ${({ theme }) => theme.typography.fontFamily.bold} !important;
    border-radius: 48px !important;
    height: 48px !important;
    padding: 0 48px !important;
    box-shadow: ${({ theme }) => theme.glow} !important;
  `,
};
