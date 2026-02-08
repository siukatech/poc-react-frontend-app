import AxiosInterceptor from './components/AxiosInterceptor';

import {
  preEncryptedDataObjProcessor,
  postEncryptedDataRetProcessor,
} from './processors/processor-encrypted';

import {
  preDataObjProcessor,
  postDataRetProcessor,
  initReqConfigProcessors,
  ProcessorAxiosRequestConfig,
} from './processors/processor-general';
import {
  preProtectedDataObjProcessor,
  postProtectedDataRetProcessor,
} from './processors/processor-protected';

import {
  prePublicDataObjProcessor,
  postPublicDataRetProcessor,
} from './processors/processor-public';

import axiosService from './services/axios-service';

import {
  TResponseErr,
  TServerErr,
  resolveServerErr,
} from './services/AxiosErrorHandler';

export {
  AxiosInterceptor,
  preEncryptedDataObjProcessor,
  postEncryptedDataRetProcessor,
  preDataObjProcessor,
  postDataRetProcessor,
  initReqConfigProcessors,
  preProtectedDataObjProcessor,
  postProtectedDataRetProcessor,
  prePublicDataObjProcessor,
  postPublicDataRetProcessor,
  axiosService,
  resolveServerErr,
};
export type { ProcessorAxiosRequestConfig, TResponseErr, TServerErr };
