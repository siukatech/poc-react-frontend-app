import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

type TAxiosErrDetail = {
  errCode?: string;
  errRes?: AxiosResponse<unknown, any>;
  resStatus?: number;
  resReqRes?: any;
  resData?: any;
};

type TResponseErr = {
  status?: number;
  timestamp?: string;
  path?: string;
  errCode?: string;
  message?: string;
  resData?: any;
  handler: TServerErrHandler;
};

type TServerErr = {
  axiosErr: AxiosError;
  responseErr: TResponseErr;
};

type TServerErrHandler = {
  title: string;
  path?: string;
  doLogout: boolean;
};

const SERVER_ERR_HANDLER_STATUS_DEFAULT = 999;

const SERVER_ERR_HANDLER_MAP: any = {
  '401': {
    title: 'error.login.expired',
    path: '/login',
    doLogout: true,
  } as TServerErrHandler,
  'undefined_ERR_NETWORK': {
    title: 'error.login.expired',
    path: '/login',
    doLogout: true,
  },
  [SERVER_ERR_HANDLER_STATUS_DEFAULT]: {
    title: 'error.dialog.title',
    path: undefined,
    doLogout: false,
  } as TServerErrHandler,
};

const resolveAxiosErrDetails = (axiosErr: AxiosError): any => {
  const errCode = axiosErr.code;
  const errRes = axiosErr.response;
  const resStatus = errRes?.status;
  console.debug(
    `AxiosErrorHandler - resolveAxiosErrDetails - axiosErr: `,
    axiosErr
  );
  console.debug(
    `AxiosErrorHandler - resolveAxiosErrDetails - resStatus: [${resStatus}], errCode: [${errCode}], errRes: `,
    errRes
  );
  const resReqRes =
    errRes?.request?.response == null || errRes?.request?.response === ''
      ? null
      : errRes.request.response;
  let resData =
    errRes?.data == null || errRes?.data === '' ? null : errRes.data;
  return {
    errCode,
    errRes,
    resStatus,
    resReqRes,
    resData,
  } as TAxiosErrDetail;
};

const resolveServerErrHandler = (
  resStatus: undefined | number,
  errCode: undefined | string
): TServerErrHandler => {
  let serverErrHandler;
  console.debug(`resolveServerErrHandler - resStatus: [${resStatus}], resStatus_errCode: [${resStatus}_${errCode}]`);
  if (serverErrHandler == null) {
    serverErrHandler = SERVER_ERR_HANDLER_MAP[`${resStatus}`];
  }
  if (serverErrHandler == null) {
    serverErrHandler = SERVER_ERR_HANDLER_MAP[`${resStatus}_${errCode}`];
  }
  serverErrHandler =
    serverErrHandler == null
      ? SERVER_ERR_HANDLER_MAP[SERVER_ERR_HANDLER_STATUS_DEFAULT]
      : serverErrHandler;
  return serverErrHandler;
};

const constructServerErr401 = (axiosErr: AxiosError): TServerErr => {
  const { errRes, resData } = resolveAxiosErrDetails(axiosErr);
  let message = resData?.message || errRes?.statusText || axiosErr.message;
  return {
    axiosErr,
    responseErr: {
      status: 401,
      message: message,
      resData,
    } as TResponseErr,
  } as TServerErr;
};

const resolveServerErr = (axiosErr: AxiosError) => {
  const { errCode, errRes, resStatus, resReqRes, resData } =
    resolveAxiosErrDetails(axiosErr);
  const serverErrHandler = resolveServerErrHandler(resStatus, errCode);
  let responseErr;

  console.debug(
    `AxiosErrorHandler - resolveServerErr - preparation - resData: `,
    resData
  );
  console.debug(
    `AxiosErrorHandler - resolveServerErr - preparation - axiosErr: `,
    axiosErr
  );
  console.debug(
    `AxiosErrorHandler - resolveServerErr - preparation - errRes: `,
    errRes
  );
  console.debug(
    `AxiosErrorHandler - resolveServerErr - preparation - resReqRes: `,
    resReqRes
  );
  if (responseErr == null && resData != null) {
    responseErr = {
      ...resData,
      errCode: errCode,
      message: resData.error,
      resData,
      handler: serverErrHandler,
    } as TResponseErr;
    console.debug(
      `AxiosErrorHandler - resolveServerErr - resData - responseErr: `,
      responseErr
    );
  }
  if (responseErr == null && resReqRes != null) {
    console.debug(
      `AxiosErrorHandler - resolveServerErr - (responseErr == null && resReqRes != null)`
    );
    const data = JSON.parse(resReqRes);
    responseErr = {
      ...data,
      errCode: errCode,
      message: data.error,
      resData,
      handler: serverErrHandler,
    } as TResponseErr;
    console.debug(
      `AxiosErrorHandler - resolveServerErr - resReqRes - responseErr: `,
      responseErr
    );
  }
  if (responseErr == null && errRes != null) {
    responseErr = {
      status: resStatus,
      errCode: errCode,
      message: errRes.statusText,
      resData,
      handler: serverErrHandler,
    } as TResponseErr;
    console.debug(
      `AxiosErrorHandler - resolveServerErr - (responseErr == null && errRes != null)`
    );
    console.debug(
      `AxiosErrorHandler - resolveServerErr - errRes - responseErr: `,
      responseErr
    );
  }
  if (responseErr == null && axiosErr != null) {
    responseErr = {
      status: resStatus,
      errCode: errCode,
      message: axiosErr.message,
      resData,
      handler: serverErrHandler,
    } as TResponseErr;
    console.debug(
      `AxiosErrorHandler - resolveServerErr - (responseErr == null && axiosErr != null)`
    );
    console.debug(
      `AxiosErrorHandler - resolveServerErr - axiosErr - responseErr: `,
      responseErr
    );
  }
  let serverErr = {
    axiosErr,
    responseErr,
  } as TServerErr;
  if (isErrAuth401(serverErr)) {
    serverErr.responseErr.status = 401;
    serverErr.responseErr.handler = resolveServerErrHandler(
      serverErr.responseErr.status, serverErr.responseErr.errCode
    );
  }
  return serverErr;
};

const isErrAuth401 = (serverErr: TServerErr) => {
  let is401 = false;
  const { responseErr } = serverErr;
  let retStatus = responseErr?.status;
  let errCode = responseErr?.errCode;
  let path = responseErr?.path ? responseErr?.path : '';
  if (
    retStatus === 401 ||
    // (retStatus == null && errCode == 'ERR_NETWORK') || // CORS issue, CORS should be thrown!!!
    (retStatus === 500 && errCode == 'ERR_CANCELED') ||
    (retStatus === 500 &&
      errCode == 'ERR_BAD_RESPONSE' &&
      path.indexOf('auth/refresh-token/keycloak') >= 0)
  ) {
    is401 = true;
  }
  return is401;
};
const isErrNetwork = (serverErr: TServerErr) => {
  let result = false;
  const { responseErr } = serverErr;
  let retStatus = responseErr?.status;
  let errCode = responseErr?.errCode;
  let path = responseErr?.path ? responseErr?.path : '';
  if (
    retStatus == null &&
    errCode == 'ERR_NETWORK' // CORS issue, CORS should be thrown!!!
  ) {
    result = true;
  }
  return result;
};

export type { TResponseErr, TServerErr };
export { resolveServerErr, isErrAuth401, isErrNetwork };
