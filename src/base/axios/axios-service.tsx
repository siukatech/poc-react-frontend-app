import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';

import { parseDateToUtc } from '../utils/date';
import { deepMergeObject } from '../utils/object';

import { ProcessorAxiosRequestConfig } from './processors/processor-general';
import { prePublicDataObjProcessor } from './processors/processor-public';
import { preProtectedDataObjProcessor } from './processors/processor-protected';
import { preEncryptedDataObjProcessor } from './processors/processor-encrypted';
import { doRefreshToken, restoreTokens } from '../services/LoginService';

const axiosService = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// // axiosService.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
// //axiosService.defaults.headers["Content-Type"] = "application/json";

// // Reference:
// // https://axios-http.com/docs/req_config
// axiosService.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): ProcessorAxiosRequestConfig => {
//     // console.log('interceptor.request - 1');
//     // const tokens = restoreTokens();
//     // // config.headers.common = config.headers.common ?? {};
//     // // config.headers.common['Authorization'] = `bearer ${tokens.access_token}`;
//     // config.headers['Authorization'] = `Bearer ${tokens.access_token}`;
//     // // config.processors = config.processors ?? {};
//     // if (config.url.indexOf(process.env.REACT_APP_API_PATH_V1_PUBLIC) >= 0) {
//     //   config.processors = deepMergeObject(
//     //     {
//     //       postDataRetProcessor: postPublicDataRetProcessor,
//     //     },
//     //     config.processors
//     //   );
//     // }
//     // // config.interceptors = config.interceptors ?? [];
//     // // config.interceptors.push(1);
//     // config = prePublicDataObjProcessor(config);
//     let configProcessed = preEncryptedDataObjProcessor(
//       config as ProcessorAxiosRequestConfig
//     );
//     // console.log('interceptor.request - 1 - configProcessed: ', configProcessed);
//     return configProcessed;
//   },
//   undefined,
//   { synchronous: true }
// );
// axiosService.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): ProcessorAxiosRequestConfig => {
//     // console.log(
//     //   'interceptor.request - 2 - config.interceptors: ',
//     //   config.interceptors
//     // );
//     // if (config.url.indexOf(process.env.REACT_APP_API_PATH_V1_PROTECTED) >= 0) {
//     //   config.processors = deepMergeObject(
//     //     {
//     //       postDataRetProcessor: postProtectedDataRetProcessor,
//     //       preDataObjProcessor: preDataObjProcessor,
//     //     },
//     //     config.processors
//     //   );
//     // }
//     // // config.interceptors = config.interceptors ?? [];
//     // // config.interceptors.push(2);
//     let configProcessed = preProtectedDataObjProcessor(
//       config as ProcessorAxiosRequestConfig
//     );
//     // console.log('interceptor.request - 2 - configProcessed: ', configProcessed);
//     return configProcessed;
//   },
//   undefined,
//   { synchronous: true }
// );
// axiosService.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): ProcessorAxiosRequestConfig => {
//     // console.log(
//     //   'interceptor.request - 3 - config.interceptors: ',
//     //   config.interceptors
//     // );
//     // if (config.url.indexOf(process.env.REACT_APP_API_PATH_V1_ENCRYPTED) >= 0) {
//     //   config.processors = deepMergeObject(
//     //     {
//     //       postDataRetProcessor: postEncryptedDataRetProcessor,
//     //       preDataObjProcessor: preDataObjProcessor,
//     //     },
//     //     config.processors
//     //   );
//     // }
//     // // config.interceptors = config.interceptors ?? [];
//     // // config.interceptors.push(3);
//     let configProcessed = prePublicDataObjProcessor(
//       config as ProcessorAxiosRequestConfig
//     );
//     // console.log('interceptor.request - 3 - configProcessed: ', configProcessed);
//     return configProcessed;
//   },
//   undefined,
//   { synchronous: true }
// );

// axiosService.interceptors.response.use(
//   (response) => {
//     // console.log('interceptor.response.normal - 1');
//     const processedConfig: ProcessorAxiosRequestConfig =
//       response.config as ProcessorAxiosRequestConfig;
//     response.data = processedConfig.processors?.postDataRetProcessor(
//       response.data,
//       processedConfig
//     );
//     // console.log(
//     //   'interceptor.response.normal - 1 - processedConfig: ',
//     //   processedConfig
//     // );
//     return response;
//   },
//   // async (err): Promise<any> => {
//   async (err) => {
//     console.log('interceptor.response.err - 1 - err: ', err);
//     let retStatus = err.response?.status;
//     let errorCode = err.code;
//     if (
//       retStatus === 401 ||
//       errorCode == 'ERR_NETWORK' ||
//       (retStatus === 500 && errorCode == 'ERR_CANCELED')
//     ) {
//       // const tokens = restoreTokens();
//       // const payload = {
//       //   access_token: tokens?.access_token,
//       //   refresh_token: tokens?.refresh_token,
//       // };

//       // let tokenRefreshUrl =
//       //   process.env.REACT_APP_API_PATH_PREFIX +
//       //   process.env.REACT_APP_API_PATH_V1_PUBLIC +
//       //   process.env.REACT_APP_API_OAUTH_REFRESH_TOKEN;
//       // tokenRefreshUrl = tokenRefreshUrl.replace(
//       //   '{0}',
//       //   process.env.REACT_APP_API_OAUTH_CLIENT_NAME
//       // );
//       // console.log(
//       //   'axiosService - response.use - tokenRefreshUrl: [' +
//       //     tokenRefreshUrl +
//       //     ']'
//       // );
//       // let apiResponse = await axios.post(tokenRefreshUrl, payload);
//       // sessionStorage.setItem('tokens', JSON.stringify(apiResponse.data));

//       try {
//         // const tokensRefreshed = await doRefreshToken();
//         // if (tokensRefreshed != null) {
//         const refreshTokenResult: any = await doRefreshToken();
//         console.log(
//           'interceptor.response.err - 1 - refreshTokenResult: ',
//           refreshTokenResult
//         );
//         if (!(refreshTokenResult instanceof AxiosError)) {
//           const tokensRefreshed = refreshTokenResult;
//           console.log(
//             'interceptor.response.err - 1 - tokensRefreshed: ',
//             tokensRefreshed
//           );
//           err.config.headers[
//             'Authorization'
//           ] = `Bearer ${tokensRefreshed.access_token}`;
//           //
//           //
//           // the created axios instance (axiosService, not axios) MUST be used.
//           // because the interceptor(s) of request and response are required for the follow-up.
//           //
//           //// return axios(err.config);
//           // const axiosResRefreshed = await axios(err.config);
//           const axiosResRefreshed = await axiosService(err.config);
//           console.log(
//             `interceptor.response.err - 1 - axiosResRefreshed: `,
//             axiosResRefreshed
//           );
//           return axiosResRefreshed;
//         }
//         console.log('interceptor.response.err - 1 - end');
//       } catch (doRefreshTokenErr) {
//         console.log(
//           'interceptor.response.err - 1 - doRefreshTokenErr: ',
//           doRefreshTokenErr
//         );
//         return Promise.reject(doRefreshTokenErr);
//       }
//     } else {
//       return Promise.reject(err);
//     }
//   }
// );
// // axiosService.interceptors.response.use(
// //   (response) => {
// //     console.log('interceptor.response.normal - 2');
// //     console.log(
// //       'interceptor.response.normal - 2 - response.config: ',
// //       response.config
// //     );
// //     return response;
// //   },
// //   async (err): Promise<any> => {
// //     console.log('interceptor.response.err - 2');
// //     console.log('interceptor.response.err - 2 - err: ', err);
// //     return Promise.reject(err);
// //   }
// // );
// // axiosService.interceptors.response.use(
// //   (response) => {
// //     console.log('interceptor.response.normal - 3');
// //     console.log(
// //       'interceptor.response.normal - 3 - response.config: ',
// //       response.config
// //     );
// //     return response;
// //   },
// //   async (err): Promise<any> => {
// //     console.log('interceptor.response.err - 3');
// //     console.log('interceptor.response.err - 3 - err: ', err);
// //     return Promise.reject(err);
// //   }
// // );

export default axiosService;
