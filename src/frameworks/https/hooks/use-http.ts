import { useReducer, useCallback } from 'react';

enum HttpReducerActionType {
  SEND = 'SEND',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

enum HttpReducerStateStatus {
  NOT_INITIALIZED = 'NOT_INITIALIZED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

interface IHttpReducerState {
  status: HttpReducerStateStatus;
  data?: any;
  error?: any;
}

interface IHttpReducerAction {
  type: HttpReducerActionType;
  data?: any;
  error?: any;
}

const httpReducer = (state: IHttpReducerState, action: IHttpReducerAction) => {
  if (action.type === HttpReducerActionType.SEND) {
    return {
      data: null,
      error: null,
      status: HttpReducerStateStatus.PENDING,
    };
  }

  if (action.type === HttpReducerActionType.SUCCESS) {
    return {
      data: action.data,
      error: null,
      status: HttpReducerStateStatus.COMPLETED,
    };
  }

  if (action.type === HttpReducerActionType.ERROR) {
    let errorObj = null;
    try {
      errorObj = JSON.parse(action.error);
    } catch (e) {
      console.debug(
        'use-http - httpReducer - action.type: [' +
          action.type +
          '], action.error: [' +
          action.error +
          '], e: [' +
          e +
          ']'
      );
      // errorObj = { detail: e };
      errorObj = { innerError: action.error, message: e };
    }
    console.debug(
      'use-http - httpReducer - 2 - action.type: [' +
        action.type +
        '], action.error: [' +
        action.error +
        '], errorObj: ',
      errorObj
    );
    return {
      data: null,
      //error: action.error,
      error: errorObj,
      status: HttpReducerStateStatus.ERROR,
    };
  }

  return state;
};

const useHttp = (fetcher: Function, startWithPending: boolean = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending
      ? HttpReducerStateStatus.PENDING
      : HttpReducerStateStatus.NOT_INITIALIZED,
    data: null,
    error: null,
  });

  const request = useCallback(
    async function (config: any): Promise<any> {
      dispatch({ type: HttpReducerActionType.SEND });
      try {
        const data = await fetcher(config);
        dispatch({ type: HttpReducerActionType.SUCCESS, data });
      } catch (err) {
        console.debug('use-http - config - error: [' + err + ']');
        dispatch({
          type: HttpReducerActionType.ERROR,
          // error: error || 'Something went wrong!',
          error: err,
        });
      }
    },
    [fetcher]
  );

  return {
    request,
    ...httpState,
  };
};

export default useHttp;
export { HttpReducerStateStatus, HttpReducerActionType };
export type { IHttpReducerState, IHttpReducerAction };
