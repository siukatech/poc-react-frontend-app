import { PayloadAction, createReducer, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../models';
import {
  DoAuthLoginPayload,
  doAuthLogin,
  restoreUser,
} from '../services/LoginService';
import { AxiosError } from 'axios';
import store, { RootState } from '../../../frameworks/app/stores/store';
// import { rootSliceReducer } from '../../../frameworks/app/stores/slices';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

interface AuthState {
  user?: IUser;
  // timeoutErr?: AxiosError;
}

const initialState: AuthState = {
  user: restoreUser(),
  // timeoutErr: undefined,
};
// Workaround: cast state instead of declaring variable type
// const initialState = {
//   user: undefined,
//   timeoutErr: undefined,
// } as AuthState;

const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState,
  reducers: {
    // Reference:
    // https://stackoverflow.com/a/76199168
    // `action` requires the type `PayloadAction<any>`
    bindAuth: (state: AuthState, action: PayloadAction<AuthState>) => {
      console.debug(`authSlice - bindAuth - action: `, action);
      const {
        user,
        // timeoutErr,
      } = action.payload;
      state.user = user;
      // state.timeoutErr = timeoutErr;
      // return {
      //   ...state,
      //   user,
      // };
    },
    clearAuth: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.user = undefined;
      // state.timeoutErr = undefined;
      // return {};
    },
    // checkTimeout: (state: AuthState, action: any) => {},
    // checkPermission: (state: AuthState, action: any) => {},
  },
});

const { bindAuth, clearAuth } = authSlice.actions;

// const authReducer = rootSliceReducer.inject({
//   reducerPath: 'auth',
//   reducer: authSlice.reducer,
// });
// const withAuth = rootSliceReducer.inject({
//   reducerPath: 'auth',
//   reducer: authSlice.reducer,
// });

// Other code such as selectors can use the imported `RootState` type
const selectAuthUser = (state: AuthState) => state.user;
// const selectTimeoutErr = (state: AuthState) => state.timeoutErr;
const useAuthSelector: TypedUseSelectorHook<AuthState> = useSelector;

// store.injectSlice('auth', authSlice);

//store.replaceReducer()
// const doLogin = async (payload: DoAuthLoginPayload) => {
//   const user = await doAuthLogin(payload);
//   return (dispatch: (arg0: { user: IUser; }) => void) => {
//     dispatch({ user: user });
//   };
// };

export default authSlice.reducer;
export {
  authSlice,
  bindAuth,
  clearAuth,
  selectAuthUser,
  // selectTimeoutErr,
  useAuthSelector,
};
