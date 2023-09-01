import { postDataRetProcessor } from "./post-processor-general";


const postProtectedDataRetProcessor = (dataRet, reqConfig) => {
  return postDataRetProcessor(dataRet, reqConfig);
}

export { postProtectedDataRetProcessor };

