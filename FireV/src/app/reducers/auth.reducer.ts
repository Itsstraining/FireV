import { createReducer, on } from '@ngrx/store';
import { AuthState } from 'src/app/states/auth.state';
import * as AuthActions from 'src/app/actions/auth.action';
import { User } from '../models/user.model';

const initialState: AuthState = {
  isAuthenticated: false,
  idToken: '',
  error: '',
  _id: '',
  user: <User>{}
};
export const authReducer = createReducer(
  initialState,
  /////////////////////////////////////////////////////////////
  on(AuthActions.login, (state,action) => {
    console.log(action.type);
    return state
  }),
  on(AuthActions.loginSuccess, (state, action) => {
    let newState = {
      ...state,
      isAuthenticated: true,
      idToken: action.idToken,
    };
    console.log(action.type);
    return newState;
  }),

  on(AuthActions.loginFailure, (state, action) => {
    let newState = {
      ...state,
      error: action.error,
    };
    console.log(newState);
    return newState;
  }),

  ////////////////////////////////////////////////////////////////////
  on(AuthActions.logOut, (state,action) => {
    console.log(action.type);
    return state
  }),
  on(AuthActions.logOutSuccess, (state, action) => {
    let newState = {
      ...state,
      idToken: '',
      _id: '',
      isAuthenticated: false,
    };
    console.log(action.type);
    return newState;
  }),
  on(AuthActions.logOutFailure, (state, action) => {
    let newState = {
      ...state,
      error: action.error,
    };
    console.log(action.error);
    return newState;
  }),

  ///////////////////////////////////////////////////////////////////
  on(AuthActions.createUser, (state, action) => {
    console.log(action.type);
    return state;
  }),
  on(AuthActions.createUserSuccess, (state, action) => {
    let newState = {
      ...state,
      isAuthenticated: true,
      user: action.user
    }
    console.log(newState.user);
    return newState;
  }), on(AuthActions.createUserFailure, (state, action) => {
    let newState = {
      ...state,
      error: action.error
    }
    console.log(newState);
    return state;
  }),

  ///////////////////////////////////////////////////////////////////
  on(AuthActions.getIdToken, (state, action) => {
    console.log(action.type);
    return state;
  }),
  on(AuthActions.getIdTokenSuccess, (state, action) => {
    let newState = {
      ...state,
      isAuthenticated: true,
      idToken: action.idToken,
    }
    console.log(action.idToken);
    return newState;
  }), on(AuthActions.getIdTokenFailure, (state, action) => {
    let newState = {
      ...state,
      error: action.error
    }
    console.log(newState);
    return state;
  }),

  /////////////////////////////////////////////////////////////
  on(AuthActions.getUserId, (state, action) => {
    let newState = {
      ...state,
    }
    console.log(action.type);
    return newState;
  }),
  on(AuthActions.getUserIdSuccess, (state, action) => {
    let newState = {
      ...state,
      _id: action._id,
      isAuthenticated: true,
    }
    console.log(action.type);
    return newState;
  }),
  on(AuthActions.getUserIdFailure, (state, action) => {
    let newState = {
      ...state,
      isAuthenticated: false,
      error: action.error
    }
    console.log(action.type);
    return newState;
  }),


  /////////////////////////////////////////////////////////////
  on(AuthActions.updateSub, (state, action) => {
    let newState = {
      ...state,
    }
    console.log(action.type);
    return newState;
  }),
  on(AuthActions.updateSubSuccess, (state, action) => {
    let newState = {
      ...state,
      user: action.user,
      isAuthenticated: true,
    }
    console.log(action.type);
    return newState;
  }),
  on(AuthActions.updateSubFailure, (state, action) => {
    let newState = {
      ...state,
      isAuthenticated: false,
      error: action.error
    }
    console.log(action.type);
    return newState;
  }),

)
