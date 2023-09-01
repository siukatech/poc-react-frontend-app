import { deepMergeObject } from '../../utils/object';

import { preDataObjProcessor, postDataRetProcessor } from './processor-general';


const prePublicDataObjProcessor = (reqConfig) => {
  console.log('prePublicDataObjProcessor - 1');
  //
  reqConfig = preDataObjProcessor(reqConfig);
  //
  // if (reqConfig.url.indexOf(process.env.REACT_APP_API_V1_PUBLIC_URI) >= 0) {
  reqConfig.processors = deepMergeObject(
    reqConfig.processors, 
    {
      postDataRetProcessor: postPublicDataRetProcessor,
    },
  );
  // }
  console.log('prePublicDataObjProcessor - 1 - reqConfig: ', reqConfig);
  return reqConfig;
};

const postPublicDataRetProcessor = (dataRet, reqConfig) => {
  return postDataRetProcessor(dataRet, reqConfig);
};

export { prePublicDataObjProcessor, postPublicDataRetProcessor };

