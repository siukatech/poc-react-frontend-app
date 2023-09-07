import axios, { InternalAxiosRequestConfig } from 'axios';

import { parseDateToUtc } from '../utils/date';
import { deepMergeObject } from '../utils/object';

import { ProcessorAxiosRequestConfig } from './processors/processor-general';
import { prePublicDataObjProcessor } from './processors/processor-public';
import { preProtectedDataObjProcessor } from './processors/processor-protected';
import { preEncryptedDataObjProcessor } from './processors/processor-encrypted';
import { doRefreshToken, restoreTokens } from '../services/LoginService';

const axiosService = axios.create({});


// Reference:
// https://axios-http.com/docs/req_config
axiosService.interceptors.request.use((config: InternalAxiosRequestConfig): ProcessorAxiosRequestConfig => {
  console.log('interceptor.request - 1');
  // const tokens = restoreTokens();
  // // config.headers.common = config.headers.common ?? {};
  // // config.headers.common['Authorization'] = `bearer ${tokens.access_token}`;
  // config.headers['Authorization'] = `Bearer ${tokens.access_token}`;
  // // config.processors = config.processors ?? {};
  // if (config.url.indexOf(process.env.REACT_APP_API_V1_PUBLIC_URI) >= 0) {
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
  let configProcessed = preEncryptedDataObjProcessor(config as ProcessorAxiosRequestConfig);
  console.log('interceptor.request - 1 - configProcessed: ', configProcessed);
  return configProcessed;
});
axiosService.interceptors.request.use((config: InternalAxiosRequestConfig): ProcessorAxiosRequestConfig => {
  // console.log(
  //   'interceptor.request - 2 - config.interceptors: ',
  //   config.interceptors
  // );
  // if (config.url.indexOf(process.env.REACT_APP_API_V1_PROTECTED_URI) >= 0) {
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
  let configProcessed = preProtectedDataObjProcessor(config as ProcessorAxiosRequestConfig);
  console.log('interceptor.request - 2 - configProcessed: ', configProcessed);
  return configProcessed;
});
axiosService.interceptors.request.use((config: InternalAxiosRequestConfig): ProcessorAxiosRequestConfig => {
  // console.log(
  //   'interceptor.request - 3 - config.interceptors: ',
  //   config.interceptors
  // );
  // if (config.url.indexOf(process.env.REACT_APP_API_V1_ENCRYPTED_URI) >= 0) {
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
  let configProcessed = prePublicDataObjProcessor(config as ProcessorAxiosRequestConfig);
  console.log('interceptor.request - 3 - configProcessed: ', configProcessed);
  return configProcessed;
});

axiosService.interceptors.response.use(
  (response) => {
    console.log('interceptor.response.normal - 1');
    const processedConfig: ProcessorAxiosRequestConfig = response.config as ProcessorAxiosRequestConfig;
    response.data = processedConfig.processors?.postDataRetProcessor(
      response.data,
      processedConfig
    );
    console.log(
      'interceptor.response.normal - 1 - processedConfig: ',
      processedConfig
    );
    return response;
  },
  async (error): Promise<any> => {
    console.log('interceptor.response.error - 1');
    console.log('interceptor.response.error - 1 - error: ', error);
    let retStatus = error.response?.status;
    let errorCode = error.code;
    if (retStatus === 401 || errorCode == 'ERR_NETWORK') {
      // const tokens = restoreTokens();
      // const payload = {
      //   access_token: tokens?.access_token,
      //   refresh_token: tokens?.refresh_token,
      // };

      // let tokenRefreshUrl =
      //   process.env.REACT_APP_API_DOMAIN_PREFIX +
      //   process.env.REACT_APP_API_V1_PUBLIC_URI +
      //   process.env.REACT_APP_OAUTH_REFRESH_TOKEN_URI;
      // tokenRefreshUrl = tokenRefreshUrl.replace(
      //   '{0}',
      //   process.env.REACT_APP_OAUTH_CLIENT_NAME
      // );
      // console.log(
      //   'axiosService - response.use - tokenRefreshUrl: [' +
      //     tokenRefreshUrl +
      //     ']'
      // );
      // let apiResponse = await axios.post(tokenRefreshUrl, payload);
      // sessionStorage.setItem('tokens', JSON.stringify(apiResponse.data));
      const tokensRefreshed = await doRefreshToken();
      if (tokensRefreshed != null) {
        error.config.headers[
          'Authorization'
        ] = `Bearer ${tokensRefreshed.access_token}`;
        return axios(error.config);
      } else {
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  }
);
axiosService.interceptors.response.use(
  (response) => {
    console.log('interceptor.response.normal - 2');
    console.log(
      'interceptor.response.normal - 2 - response.config: ',
      response.config
    );
    return response;
  },
  async (error): Promise<any> => {
    console.log('interceptor.response.error - 2');
    console.log('interceptor.response.error - 2 - error: ', error);
    return Promise.reject(error);
  }
);
axiosService.interceptors.response.use(
  (response) => {
    console.log('interceptor.response.normal - 3');
    console.log(
      'interceptor.response.normal - 3 - response.config: ',
      response.config
    );
    return response;
  },
  async (error): Promise<any> => {
    console.log('interceptor.response.error - 3');
    console.log('interceptor.response.error - 3 - error: ', error);
    return Promise.reject(error);
  }
);

export default axiosService;
