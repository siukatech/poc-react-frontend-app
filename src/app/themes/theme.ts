import {
  ThemeProvider,
  Theme,
  createTheme,
  styled,
  useTheme,
} from '@mui/material/styles';

import shade from './shade';

const theme = createTheme({
  palette: {
    // mode: 'dark',
    mode: 'light',
    primary: {
      main: shade[500],
    },
  },
});

export default theme;

