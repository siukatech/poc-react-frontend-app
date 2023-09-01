import { deepMergeObject } from '../../utils/object';

import { postProtectedDataRetProcessor } from './post-processor-protected';

const preProtectedDataObjProcessor = (reqConfig) => {
  console.log('preProtectedDataObjProcessor - 1');
  let tokensData = JSON.parse(sessionStorage.getItem('tokens'));
  // reqConfig.headers.common = reqConfig.headers.common ?? {};
  // reqConfig.headers.common['Authorization'] = `bearer ${tokensData.access_token}`;
  reqConfig.headers['Authorization'] = `Bearer ${tokensData.access_token}`;
  // reqConfig.processors = reqConfig.processors ?? {};
  if (reqConfig.url.indexOf(process.env.REACT_APP_API_V1_PROTECTED_URI) >= 0) {
    reqConfig.processors = deepMergeObject(
      {
        postDataRetProcessor: postProtectedDataRetProcessor,
      },
      reqConfig.processors
    );
  }
  // reqConfig.interceptors = reqConfig.interceptors ?? [];
  // reqConfig.interceptors.push(1);
  console.log('preProtectedDataObjProcessor - 1 - reqConfig: ', reqConfig);

  return reqConfig;
};

export { preProtectedDataObjProcessor };
