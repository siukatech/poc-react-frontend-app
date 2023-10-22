import {
  ThemeProvider,
  Theme,
  createTheme,
  styled,
  useTheme,
} from '@mui/material/styles';

import shade from './shade';
import { create } from 'domain';

const theme = createTheme({
  palette: {
    // mode: 'dark',
    mode: 'light',
    primary: {
      main: shade[500],
    },
  },
});

/**
 * Reference:
 * https://github.com/mingfang/jsonforms-demo/blob/master/src/index.tsx#L9
 * https://github.com/rjsf-team/react-jsonschema-form/issues/1987#issuecomment-1147517375
 */
const themeFormReadonly = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: '0.3em 0',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&.Mui-disabled': {
            borderBottom: 'none',
            '&&&:before': {
              borderBottom: 'none',
            },
            '&&:after': {
              borderBottom: 'none',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            display: 'none',
          },
        },
      },
    },
  },
  palette: {
    action: {
      disabled: 'black',
    },
    text: {
      disabled: 'black',
    },
  },
});

export default theme;
export { themeFormReadonly };
