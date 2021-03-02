import {User} from '../../models/user.model';
import * as fromActions from '../actions';

export interface IAuthState {
  user: User;
}

export const initAuthState: IAuthState = {
  user: null || new User({
    uid: '',
    email: '',
    emailVerified: false,
    apiKey: '',
    authDomain: '',
    displayName: '',
    lastLoginAt: '',
    photoURL: '',
    stsTokenManager: {},
    id: 0,
  }),
};

export function authReducer (
  state = initAuthState,
  action: fromActions.AuthActions,
): IAuthState {
  switch(action.type) {
    case fromActions.AuthActionTypes.SET_AUTH:
      return {
        ...state,
        user: {...action.user}
      };

    case fromActions.AuthActionTypes.CLEAR_AUTH:
      return {... initAuthState};

    default:
      return state;
  }
}
