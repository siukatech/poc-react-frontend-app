import { useReducer, useCallback } from 'react';

const httpReducer = (state, action) => {
  if (action.type === 'SEND') {
    return {
      data: null,
      error: null,
      status: 'pending',
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      status: 'completed',
    };
  }

  if (action.type === 'ERROR') {
    let errorObj = null;
    try {
      errorObj = JSON.parse(action.errorMessage);
    } catch (e) {
      console.log(
        'use-http - httpReducer - action.type: [' +
          action.type +
          '], action.errorMessage: [' +
          action.errorMessage +
          '], e: [' +
          e +
          ']'
      );
      errorObj = { detail: e.message };
    }
    console.log(
      'use-http - httpReducer - 2 - action.type: [' +
        action.type +
        '], action.errorMessage: [' +
        action.errorMessage +
        ']'
    );
    return {
      data: null,
      //error: action.errorMessage,
      error: errorObj,
      status: 'error',
    };
  }

  return state;
};

const useHttp = (requestFunction, startWithPending = false) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'SUCCESS', responseData });
      } catch (error) {
        console.log('use-http - requestData - error: [' + error + ']');
        dispatch({
          type: 'ERROR',
          errorMessage: error?.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
