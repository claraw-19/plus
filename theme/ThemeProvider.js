import React from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { StylesProvider as MuiStylesProvider } from "@mui/styles";
import SchulLVTheme from "./default";

const ThemeProvider = ({ children, theme = SchulLVTheme }) => {
  const muiTheme = createTheme({
    palette: {
      primary: {
        main: theme.colors.tintColor,
      },
      secondary: {
        main: theme.colors.grey2,
      },
      error: {
        main: theme.colors.error,
      },
      success: {
        main: theme.colors.tintColor,
      },
    },
    props: {
      MuiButtonBase: {
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    breakpoints: {
      values: {
        xs: SchulLVTheme.breakpoints.xs.value,
        sm: SchulLVTheme.breakpoints.s.value,
        md: SchulLVTheme.breakpoints.m.value,
        lg: SchulLVTheme.breakpoints.l.value,
      },
    },
  });

  return (
    <MuiStylesProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <SCThemeProvider theme={theme}>{children}</SCThemeProvider>
      </MuiThemeProvider>
    </MuiStylesProvider>
  );
};
export default ThemeProvider;
