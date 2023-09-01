import axios from 'axios';

import { parseDateToUtc } from '../utils/date';
import { deepMergeObject } from '../utils/object';

// import { preDataObjProcessor } from './processors/pre-processor-general';
import { prePublicDataObjProcessor } from './processors/pre-processor-public';
import { preProtectedDataObjProcessor } from './processors/pre-processor-protected';
import { preEncryptedDataObjProcessor } from './processors/pre-processor-encrypted';
// import { postPublicDataRetProcessor } from './processors/post-processor-public';
// import { postProtectedDataRetProcessor } from './processors/post-processor-protected';
// import { postEncryptedDataRetProcessor } from './processors/post-processor-encrypted';

const axiosService = axios.create({});

// Reference:
// https://axios-http.com/docs/req_config
axiosService.interceptors.request.use((config) => {
  console.log('interceptor.request - 1');
  // let tokensData = JSON.parse(sessionStorage.getItem('tokens'));
  // // config.headers.common = config.headers.common ?? {};
  // // config.headers.common['Authorization'] = `bearer ${tokensData.access_token}`;
  // config.headers['Authorization'] = `Bearer ${tokensData.access_token}`;
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
  config = preEncryptedDataObjProcessor(config);
  console.log('interceptor.request - 1 - config: ', config);
  return config;
});
axiosService.interceptors.request.use((config) => {
  console.log(
    'interceptor.request - 2 - config.interceptors: ',
    config.interceptors
  );
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
  config = preProtectedDataObjProcessor(config);
  console.log('interceptor.request - 2 - config: ', config);
  return config;
});
axiosService.interceptors.request.use((config) => {
  console.log(
    'interceptor.request - 3 - config.interceptors: ',
    config.interceptors
  );
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
  config = prePublicDataObjProcessor(config);
  console.log('interceptor.request - 3 - config: ', config);
  return config;
});

axiosService.interceptors.response.use(
  (response) => {
    console.log('interceptor.response.normal - 1');
    response.data = response.config.processors.postDataRetProcessor(
      response.data,
      response.config
    );
    console.log(
      'interceptor.response.normal - 1 - response.config: ',
      response.config
    );
    return response;
  },
  async (error) => {
    console.log('interceptor.response.error - 1');
    console.log('interceptor.response.error - 1 - error: ', error);
    let retStatus = error.response?.status;
    let errorCode = error.code;
    if (retStatus === 401 || errorCode == 'ERR_NETWORK') {
      const authData = JSON.parse(sessionStorage.getItem('tokens'));
      const payload = {
        access_token: authData.access_token,
        refresh_token: authData.refresh_token,
      };

      let tokenRefreshUrl =
        process.env.REACT_APP_API_DOMAIN_PREFIX +
        process.env.REACT_APP_API_V1_PUBLIC_URI +
        process.env.REACT_APP_OAUTH_REFRESH_TOKEN_URI;
      tokenRefreshUrl = tokenRefreshUrl.replace(
        '{0}',
        process.env.REACT_APP_OAUTH_CLIENT_NAME
      );
      console.log(
        'axiosService - response.use - tokenRefreshUrl: [' +
          tokenRefreshUrl +
          ']'
      );
      let apiResponse = await axios.post(tokenRefreshUrl, payload);
      sessionStorage.setItem('tokens', JSON.stringify(apiResponse.data));
      error.config.headers[
        'Authorization'
      ] = `bearer ${apiResponse.data.access_token}`;
      return axios(error.config);
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
  async (error) => {
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
  async (error) => {
    console.log('interceptor.response.error - 3');
    console.log('interceptor.response.error - 3 - error: ', error);
    return Promise.reject(error);
  }
);

export default axiosService;
