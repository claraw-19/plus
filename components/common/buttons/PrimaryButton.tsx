import React from "react";
import styled from "styled-components";
import ButtonBase from "@mui/material/ButtonBase";
import CircularProgress from "@mui/material/CircularProgress";

export default function Button({
  onClick,
  disabled = false,
  title,
  isLoading = false,
  width,
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  isLoading?: boolean;
  width?: string;
}) {
  return (
    <Styled.Button width={width} onClick={onClick} disabled={disabled}>
      {isLoading ? (
        <Styled.CircularProgressWrapper>
          <Styled.CircularProgress size={20} thickness={6} />
        </Styled.CircularProgressWrapper>
      ) : (
        <>{title}</>
      )}
    </Styled.Button>
  );
}

const Styled = {
  Button: styled(ButtonBase)<{ width?: string }>`
    color: ${({ theme }) => theme.colors.white} !important;
    background: ${({ theme }) => theme.colors.tintColor} !important;
    &:hover {
      background: ${({ theme }) => theme.colors.tintColorHover} !important;
    }
    text-transform: initial !important;
    padding: ${({ theme }) =>
      theme.spacing.xs + " " + theme.spacing.l} !important;
    font-size: ${({ theme }) => theme.typography.fontSize.m} !important;
    font-family: ${({ theme }) => theme.typography.fontFamily.bold} !important;
    border-radius: 20px !important;
    box-shadow: ${({ theme }) => theme.glow} !important;
    align-self: center !important;
    height: 39px !important;
    width: ${({ width }) => width || "auto"} !important;
  `,
  CircularProgressWrapper: styled.div`
    padding: ${({ theme }) => theme.spacing.xs} 0;
  `,
  CircularProgress: styled(CircularProgress)`
    color: white !important;
    font-size: 4rem !important;
  `,
};
