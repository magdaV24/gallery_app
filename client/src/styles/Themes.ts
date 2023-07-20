import { ThemeOptions } from "@mui/material/styles";

export const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#9a6669',
    },
    secondary: {
      main: '#67595E',
    },
    background: {
      default: '#EED6D3',
      paper: '#fbe6e6',
    },
  },
};

export const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#babf80',
      light: '#696b55',
      dark: '#313318',
    },
    secondary: {
      main: '#D39944',
    },
    background: {
      default: '#484031',
      paper: '#22250b',
    },
  },
};
