import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { AxiosError } from 'axios';

import theme from '../themes/theme';

import LayoutLeft from '../components/LayoutLeft';
import LayoutMini from '../components/LayoutMini';
import MiniVariantDrawerLeft from '../components/MiniVariantDrawerLeft';

import { AuthContextProvider } from '../../../features/auth/stores/AuthContext';
import AxiosInterceptor from '../../axios/components/AxiosInterceptor';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      //
      // Reference:
      // https://www.youtube.com/watch?v=hd2F46ttt1U
      // https://github.com/TanStack/query/issues/2927
      // https://tanstack.com/query/v4/docs/react/guides/network-mode#network-mode-always
      // networkMode: 'offlineFirst',
      networkMode: 'always',
      //
      // Reference:
      // https://tanstack.com/query/v4/docs/react/guides/window-focus-refetching
      refetchOnWindowFocus: false,
      //
      // Reference:
      // https://stackoverflow.com/a/77210074
      onError: (err) => {
        console.log(
          `AppMain - queryClient - defaultOptions - onError - err: `,
          err
        );
        if (err instanceof AxiosError) {
          let retStatus = err.response?.status;
          let errorCode = err.code;
          if (
            retStatus === 401 ||
            (retStatus == null && errorCode == 'ERR_NETWORK') || // CORS issue
            (retStatus === 500 && errorCode == 'ERR_CANCELED')
          ) {
            console.log(
              `AppMain - queryClient - defaultOptions - onError - retStatus: [${retStatus}], errorCode: [${errorCode}]`,
              err
            );
            window.location.assign(`/login`);
          }
        }
      },
    },
  },
});

const RouterMain = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
              <AxiosInterceptor>
                {/* <LayoutLeft /> */}
                <LayoutMini />
                {/* <MiniVariantDrawerLeft /> */}
              </AxiosInterceptor>
            </AuthContextProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
};

export default RouterMain;
