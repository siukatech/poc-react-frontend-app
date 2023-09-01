import { deepMergeObject } from '../../utils/object';

import { postPublicDataRetProcessor } from './post-processor-public';

const prePublicDataObjProcessor = (reqConfig) => {
  console.log('prePublicDataObjProcessor - 1');
  if (reqConfig.url.indexOf(process.env.REACT_APP_API_V1_PUBLIC_URI) >= 0) {
    reqConfig.processors = deepMergeObject(
      {
        postDataRetProcessor: postPublicDataRetProcessor,
      },
      reqConfig.processors
    );
  }
  console.log('prePublicDataObjProcessor - 1 - reqConfig: ', reqConfig);
  return reqConfig;
}


export { prePublicDataObjProcessor };

