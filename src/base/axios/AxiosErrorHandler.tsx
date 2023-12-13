import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

type TAxiosErrDetail = {
  errorCode?: string;
  errorRes?: AxiosResponse<unknown, any>;
  resStatus?: number;
  resReqRes?: any;
  resData?: any;
};

type TResponseErr = {
  status?: number;
  message?: string;
};

type TServerErr = {
  axiosErr: AxiosError;
  responseErr: TResponseErr;
};

const resolveAxiosErrDetails = (axiosErr: AxiosError): any => {
  const errorCode = axiosErr.code;
  const errorRes = axiosErr.response;
  const resStatus = errorRes?.status;
  const resReqRes =
    errorRes?.request?.response == null || errorRes?.request?.response === ''
      ? null
      : errorRes.request.response;
  let resData =
    resReqRes?.data == null || resReqRes?.data === '' ? null : resReqRes.data;
  return {
    errorCode,
    errorRes,
    resStatus,
    resReqRes,
    resData,
  } as TAxiosErrDetail;
};

const constructServerErr401 = (axiosErr: AxiosError): TServerErr => {
  const { errorRes, resData } = resolveAxiosErrDetails(axiosErr);
  let message = resData?.message || errorRes?.statusText || axiosErr.message;
  return {
    axiosErr,
    responseErr: {
      status: 401,
      message: message,
    } as TResponseErr,
  } as TServerErr;
};

const resolveServerErr = (axiosErr: AxiosError) => {
  const { errorCode, errorRes, resStatus, resReqRes, resData } =
    resolveAxiosErrDetails(axiosErr);
  let responseErr = resData;
  let serverErr;
  if (
    resStatus === 401 ||
    (resStatus == null && errorCode == 'ERR_NETWORK') || // CORS issue
    (resStatus === 500 && errorCode == 'ERR_CANCELED')
  ) {
    serverErr = constructServerErr401(axiosErr);
  } else {
    if (responseErr == null && resReqRes != null) {
      const data = JSON.parse(resReqRes);
      responseErr = { ...data } as TResponseErr;
      console.log(
        `AxiosErrorHandler - resolveServerErr - resReqRes - resReqRes: `,
        resReqRes
      );
      console.log(
        `AxiosErrorHandler - resolveServerErr - resReqRes - responseErr: `,
        responseErr
      );
    }
    if (responseErr == null && errorRes != null) {
      responseErr = {
        status: resStatus,
        message: errorRes.statusText,
      } as TResponseErr;
      console.log(
        `AxiosErrorHandler - resolveServerErr - errorRes - errorRes: `,
        errorRes
      );
      console.log(
        `AxiosErrorHandler - resolveServerErr - errorRes - resReqRes: `,
        resReqRes
      );
    }
    if (responseErr == null && axiosErr != null) {
      responseErr = {
        message: axiosErr.message,
      } as TResponseErr
      console.log(
        `AxiosErrorHandler - resolveServerErr - axiosErr - axiosErr: `,
        axiosErr
      );
      console.log(
        `AxiosErrorHandler - resolveServerErr - axiosErr - resReqRes: `,
        resReqRes
      );
    }
    serverErr = {
      axiosErr,
      responseErr,
    } as TServerErr;
  }
  return serverErr;
};

export type { TResponseErr, TServerErr };
export { resolveServerErr };
