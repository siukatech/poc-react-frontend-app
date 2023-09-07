import { deepMergeObject } from '../../utils/object';

import {
  ProcessorAxiosRequestConfig,
  initReqConfigProcessors,
} from './processor-general';
import {
  prePublicDataObjProcessor,
  postPublicDataRetProcessor,
} from './processor-public';

import { restoreTokens } from '../../services/LoginService';

const preProtectedDataObjProcessor = (
  reqConfig: ProcessorAxiosRequestConfig
): ProcessorAxiosRequestConfig => {
  console.log('preProtectedDataObjProcessor - 1');
  //
  reqConfig = prePublicDataObjProcessor(reqConfig);
  //
  // if (reqConfig.url.indexOf(process.env.REACT_APP_API_V1_PROTECTED_URI) >= 0) {
  const tokens = restoreTokens();
  if (tokens != null) {
    // reqConfig.headers.common = reqConfig.headers.common ?? {};
    // reqConfig.headers.common['Authorization'] = `bearer ${tokens.access_token}`;
    reqConfig.headers['Authorization'] = `Bearer ${tokens.access_token}`;
    // reqConfig.processors = reqConfig.processors ?? {};
    // reqConfig.processors = deepMergeObject(
    //   reqConfig.processors,
    //   {
    //     postDataRetProcessor: postProtectedDataRetProcessor,
    //   },
    // );
    if (reqConfig.processors != null) {
      reqConfig.processors.postDataRetProcessor = postProtectedDataRetProcessor;
    } else {
      reqConfig = initReqConfigProcessors(reqConfig);
    }
  }
  // }
  // reqConfig.interceptors = reqConfig.interceptors ?? [];
  // reqConfig.interceptors.push(1);
  console.log('preProtectedDataObjProcessor - 1 - reqConfig: ', reqConfig);

  return reqConfig;
};

const postProtectedDataRetProcessor = (
  dataRet: any,
  reqConfig: ProcessorAxiosRequestConfig
): any => {
  return postPublicDataRetProcessor(dataRet, reqConfig);
};

export { preProtectedDataObjProcessor, postProtectedDataRetProcessor };
