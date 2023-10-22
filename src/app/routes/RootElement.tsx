import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import theme from '../themes/theme';
import { AuthContextProvider } from '../../base/stores/AuthContext';
import LayoutLeft from '../components/Layout/LayoutLeft';
import LayoutMini from '../components/Layout/LayoutMini';
import MiniVariantDrawerLeft from '../components/Layout/MiniVariantDrawerLeft';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const RootElement = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              {/* <LayoutLeft /> */}
              <LayoutMini />
              {/* <MiniVariantDrawerLeft /> */}
            </AuthContextProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
};

export default RootElement;
