import { deepMergeObject } from '../../utils/object';

import { ProcessorAxiosRequestConfig } from './processor-general';
import { initReqConfigProcessors } from './processor-general';
import { preDataObjProcessor, postDataRetProcessor } from './processor-general';

const prePublicDataObjProcessor = (
  reqConfig: ProcessorAxiosRequestConfig
): ProcessorAxiosRequestConfig => {
  // console.log('prePublicDataObjProcessor - 1');
  //
  reqConfig = preDataObjProcessor(reqConfig);
  //
  // if (reqConfig.url.indexOf(process.env.REACT_APP_API_PATH_V1_PUBLIC) >= 0) {
  // reqConfig.processors = deepMergeObject(
  //   reqConfig.processors,
  //   {
  //     postDataRetProcessor: postPublicDataRetProcessor,
  //   },
  // );
  if (reqConfig === null) reqConfig = initReqConfigProcessors(reqConfig);
  if (reqConfig.processors != null) {
    reqConfig.processors.postDataRetProcessor = postPublicDataRetProcessor;
  }
  // }
  // console.log('prePublicDataObjProcessor - 1 - reqConfig: ', reqConfig);
  return reqConfig;
};

const postPublicDataRetProcessor = (
  dataRet: any,
  reqConfig: ProcessorAxiosRequestConfig
): any => {
  return postDataRetProcessor(dataRet, reqConfig);
};

export { prePublicDataObjProcessor, postPublicDataRetProcessor };
