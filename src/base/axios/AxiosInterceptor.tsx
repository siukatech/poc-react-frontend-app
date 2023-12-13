import React, { useContext, useMemo, useEffect, useState } from 'react';

import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

import AuthContext from '../stores/AuthContext';
import axiosService from './axios-service';

import { ProcessorAxiosRequestConfig } from './processors/processor-general';
import { prePublicDataObjProcessor } from './processors/processor-public';
import { preProtectedDataObjProcessor } from './processors/processor-protected';
import { preEncryptedDataObjProcessor } from './processors/processor-encrypted';
import { doRefreshToken, restoreTokens } from '../services/LoginService';

import DialogPrompt from '../../app/components/UI/DialogPrompt';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { resolveServerErr } from './AxiosErrorHandler';

type AxiosInterceptorProps = {
  children?: React.ReactNode;
};

const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loginError, setLoginError] = useState();
  const { user, doLogout } = useContext(AuthContext);

  const [interceptorIdMap, setInterceptorIdMap] = useState<any>({});
  // axiosService.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
  //axiosService.defaults.headers["Content-Type"] = "application/json";

  // useMemo(() => {
  useEffect(() => {
    // console.log(`AxiosInterceptor - useMemo - interceptor.request - 1 - axiosService.interceptors: `, axiosService.interceptors);
    const interceptorKey = 'request-1';
    const existingInterceptorId = interceptorIdMap[interceptorKey];
    console.log(
      `AxiosInterceptor - useMemo - interceptor.request - 1 - existingInterceptorId: [${existingInterceptorId}], interceptorIdMap: `, interceptorIdMap
    );
    if (existingInterceptorId == null) {
      // Reference:
      // https://axios-http.com/docs/req_config
      const interceptorId = axiosService.interceptors.request.use(
        (config: InternalAxiosRequestConfig): ProcessorAxiosRequestConfig => {
          // console.log(`AxiosInterceptor - useMemo - interceptor.request - 1`);
          // const tokens = restoreTokens();
          // // config.headers.common = config.headers.common ?? {};
          // // config.headers.common['Authorization'] = `bearer ${tokens.access_token}`;
          // config.headers['Authorization'] = `Bearer ${tokens.access_token}`;
          // // config.processors = config.processors ?? {};
          // if (config.url.indexOf(process.env.REACT_APP_API_PATH_V1_PUBLIC) >= 0) {
          //   config.processors = deepMergeObject(
          //     {
          //       postDataRetProcessor: postPublicDataRetProcessor,
          //     },
          //     config.processors
          //   );
          // }
          // // config.interceptors = config.interceptors ?? [];
          // // config.interceptors.push(1);
          // config = prePublicDataObjProcessor(config);
          let configProcessed = preEncryptedDataObjProcessor(
            config as ProcessorAxiosRequestConfig
          );
          console.log(
            `AxiosInterceptor - useMemo - interceptor.request - 1 - configProcessed: `,
            configProcessed
          );
          return configProcessed;
        },
        undefined,
        { synchronous: true }
      );
      interceptorIdMap[interceptorKey] = interceptorId;
      setInterceptorIdMap(interceptorIdMap);
    }
    // return interceptorId;
    return () => {
      // axiosService.interceptors.request.eject(interceptorId);
    };
  }, []);

  // useMemo(() => {
  useEffect(() => {
    const interceptorKey = 'request-2';
    const existingInterceptorId = interceptorIdMap[interceptorKey];
    console.log(
      `AxiosInterceptor - useMemo - interceptor.request - 2 - existingInterceptorId: [${existingInterceptorId}], interceptorIdMap: `, interceptorIdMap
    );
    if (existingInterceptorId == null) {
      const interceptorId = axiosService.interceptors.request.use(
        (config: InternalAxiosRequestConfig): ProcessorAxiosRequestConfig => {
          // console.log(
          //   'interceptor.request - 2 - config.interceptors: ',
          //   config.interceptors
          // );
          // if (config.url.indexOf(process.env.REACT_APP_API_PATH_V1_PROTECTED) >= 0) {
          //   config.processors = deepMergeObject(
          //     {
          //       postDataRetProcessor: postProtectedDataRetProcessor,
          //       preDataObjProcessor: preDataObjProcessor,
          //     },
          //     config.processors
          //   );
          // }
          // // config.interceptors = config.interceptors ?? [];
          // // config.interceptors.push(2);
          let configProcessed = preProtectedDataObjProcessor(
            config as ProcessorAxiosRequestConfig
          );
          // console.log(`AxiosInterceptor - useMemo - interceptor.request - 2 - configProcessed: `, configProcessed);
          return configProcessed;
        },
        undefined,
        { synchronous: true }
      );
      interceptorIdMap[interceptorKey] = interceptorId;
      setInterceptorIdMap(interceptorIdMap);
    }
    // return interceptorId;
    return () => {
      // axiosService.interceptors.request.eject(interceptorId);
    };
  }, []);

  // useMemo(() => {
  useEffect(() => {
    const interceptorKey = 'request-3';
    const existingInterceptorId = interceptorIdMap[interceptorKey];
    console.log(
      `AxiosInterceptor - useMemo - interceptor.request - 3 - existingInterceptorId: [${existingInterceptorId}], interceptorIdMap: `, interceptorIdMap
    );
    if (existingInterceptorId == null) {
      const interceptorId = axiosService.interceptors.request.use(
        (config: InternalAxiosRequestConfig): ProcessorAxiosRequestConfig => {
          // console.log(
          //   'interceptor.request - 3 - config.interceptors: ',
          //   config.interceptors
          // );
          // if (config.url.indexOf(process.env.REACT_APP_API_PATH_V1_ENCRYPTED) >= 0) {
          //   config.processors = deepMergeObject(
          //     {
          //       postDataRetProcessor: postEncryptedDataRetProcessor,
          //       preDataObjProcessor: preDataObjProcessor,
          //     },
          //     config.processors
          //   );
          // }
          // // config.interceptors = config.interceptors ?? [];
          // // config.interceptors.push(3);
          let configProcessed = prePublicDataObjProcessor(
            config as ProcessorAxiosRequestConfig
          );
          // console.log(`AxiosInterceptor - useMemo - interceptor.request - 3 - configProcessed: `, configProcessed);
          return configProcessed;
        },
        undefined,
        { synchronous: true }
      );
      interceptorIdMap[interceptorKey] = interceptorId;
      setInterceptorIdMap(interceptorIdMap);
    }
    // return interceptorId;
    return () => {
      // axiosService.interceptors.request.eject(interceptorId);
    };
  }, []);

  // useMemo(() => {
  useEffect(() => {
    const interceptorKey = 'response-1';
    const existingInterceptorId = interceptorIdMap[interceptorKey];
    console.log(
      `AxiosInterceptor - useMemo - interceptor.response - 1 - existingInterceptorId: [${existingInterceptorId}], interceptorIdMap: `, interceptorIdMap
    );
    if (existingInterceptorId == null) {
      const interceptorId = axiosService.interceptors.response.use(
        (response) => {
          // console.log(`AxiosInterceptor - useMemo - interceptor.response.normal - 1`);
          console.log(
            `AxiosInterceptor - useMemo - interceptor.response.normal - 1 - data: `,
            response.data
          );
          const processedConfig: ProcessorAxiosRequestConfig =
            response.config as ProcessorAxiosRequestConfig;
          response.data = processedConfig.processors?.postDataRetProcessor(
            response.data,
            processedConfig
          );
          // console.log(
          //   `AxiosInterceptor - useMemo - interceptor.response.normal - 1 - processedConfig: `,
          //   processedConfig
          // );
          return response;
        },
        // async (err): Promise<any> => {
        async (err) => {
          console.log(
            `AxiosInterceptor - useMemo - interceptor.response.err - 1 - err: `,
            err
          );
          const serverErr = resolveServerErr(err);
          const { responseErr } = serverErr;
          let retStatus = responseErr?.status;
          let errorCode = err.code;
          if (
            retStatus === 401 ||
            (retStatus == null && errorCode == 'ERR_NETWORK') || // CORS issue
            (retStatus === 500 && errorCode == 'ERR_CANCELED')
          ) {
            // const tokens = restoreTokens();
            // const payload = {
            //   access_token: tokens?.access_token,
            //   refresh_token: tokens?.refresh_token,
            // };

            // let tokenRefreshUrl =
            //   process.env.REACT_APP_API_PATH_PREFIX +
            //   process.env.REACT_APP_API_PATH_V1_PUBLIC +
            //   process.env.REACT_APP_API_OAUTH_REFRESH_TOKEN;
            // tokenRefreshUrl = tokenRefreshUrl.replace(
            //   '{0}',
            //   process.env.REACT_APP_API_OAUTH_CLIENT_NAME
            // );
            // console.log(
            //   'axiosService - response.use - tokenRefreshUrl: [' +
            //     tokenRefreshUrl +
            //     ']'
            // );
            // let apiResponse = await axios.post(tokenRefreshUrl, payload);
            // sessionStorage.setItem('tokens', JSON.stringify(apiResponse.data));

            try {
              // const tokensRefreshed = await doRefreshToken();
              // if (tokensRefreshed != null) {
              const refreshTokenResult: any = await doRefreshToken();
              console.log(
                'AxiosInterceptor - useMemo - interceptor.response.err - 1 - refreshTokenResult: ',
                refreshTokenResult
              );
              if (!(refreshTokenResult instanceof AxiosError)) {
                const tokensRefreshed = refreshTokenResult;
                console.log(
                  'AxiosInterceptor - useMemo - interceptor.response.err - 1 - tokensRefreshed: ',
                  tokensRefreshed
                );
                err.config.headers[
                  'Authorization'
                ] = `Bearer ${tokensRefreshed.access_token}`;
                //
                //
                // the created axios instance (axiosService, not axios) MUST be used.
                // because the interceptor(s) of request and response are required for the follow-up.
                //
                //// return axios(err.config);
                // const axiosResRefreshed = await axios(err.config);
                const axiosResRefreshed = await axiosService(err.config);
                console.log(
                  `AxiosInterceptor - useMemo - interceptor.response.err - 1 - axiosResRefreshed: `,
                  axiosResRefreshed
                );
                return axiosResRefreshed;
              }
              console.log(
                `AxiosInterceptor - useMemo - interceptor.response.err - 1 - end`
              );
            } catch (doRefreshTokenErr) {
              console.log(
                `AxiosInterceptor - useMemo - interceptor.response.err - 1 - doRefreshTokenErr: `,
                doRefreshTokenErr
              );
              doLogout();
              console.log(
                `AxiosInterceptor - useMemo - interceptor.response.err - 1 - doLogout - end`
              );
              console.log(
                `AxiosInterceptor - useMemo - interceptor.response.err - 1 - doRefreshTokenErr instanceof AxiosError`,
                doRefreshTokenErr instanceof AxiosError
              );
              // return Promise.reject(doRefreshTokenErr);
              const isAxiosError = doRefreshTokenErr instanceof AxiosError;
              let rejectData;
              if (isAxiosError) {
                rejectData = doRefreshTokenErr.response?.data;
              }
              rejectData =
                !isAxiosError || rejectData == null ? '401' : rejectData;
              // return Promise.reject(rejectData);
              setLoginError(rejectData);
            }
          } else {
            return Promise.reject(err);
          }
        }
      );
      interceptorIdMap[interceptorKey] = interceptorId;
      setInterceptorIdMap(interceptorIdMap);
    }
    // return interceptorId;
    // return () => {
    //   // axiosService.interceptors.response.eject(interceptorId);
    // };
  }, []);

  // useMemo(() => {
  //   const interceptorKey = 'response-2';
  //   const existingInterceptorId = interceptorIdMap[interceptorKey];
  //   console.log(
  //     `AxiosInterceptor - useMemo - interceptor.response - 2 - existingInterceptorId: [${existingInterceptorId}]`
  //   );
  //   if (existingInterceptorId == null) {
  //     const interceptorId = axiosService.interceptors.response.use(
  //       (response) => {
  //         console.log(
  //           `AxiosInterceptor - useMemo - interceptor.response.normal - 2`
  //         );
  //         console.log(
  //           'interceptor.response.normal - 2 - response.config: ',
  //           response.config
  //         );
  //         return response;
  //       },
  //       async (err): Promise<any> => {
  //         console.log(
  //           `AxiosInterceptor - useMemo - interceptor.response.err - 2`
  //         );
  //         console.log(
  //           `AxiosInterceptor - useMemo - interceptor.response.err - 2 - err: `,
  //           err
  //         );
  //         return Promise.reject(err);
  //       }
  //     );
  //     axiosService.interceptors.response.use(
  //       (response) => {
  //         console.log(
  //           `AxiosInterceptor - useMemo - interceptor.response.normal - 3`
  //         );
  //         console.log(
  //           'interceptor.response.normal - 3 - response.config: ',
  //           response.config
  //         );
  //         return response;
  //       },
  //       async (err): Promise<any> => {
  //         console.log(
  //           `AxiosInterceptor - useMemo - interceptor.response.err - 3`
  //         );
  //         console.log(
  //           `AxiosInterceptor - useMemo - interceptor.response.err - 3 - err: `,
  //           err
  //         );
  //         return Promise.reject(err);
  //       }
  //     );
  //     interceptorIdMap[interceptorKey] = interceptorId;
  //     setInterceptorIdMap(interceptorIdMap);
  //   }
  //   // return interceptorId;
  // }, []);

  return (
    <>
      {loginError && (
        <DialogPrompt
          open={true}
          title={t('error.login.expired')}
          message={loginError}
          onOk={() => {
            setLoginError(undefined);
            navigate(`/login`);
          }}
        />
      )}
      {children}
    </>
  );
};

export default AxiosInterceptor;
