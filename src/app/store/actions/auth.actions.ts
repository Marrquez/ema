import {User} from '../../models/user.model';
import {Action} from '@ngrx/store';

export enum AuthActionTypes {
  SET_AUTH = '[Auth] SET_AUTH',
  CLEAR_AUTH = '[Auth] CLEAR_AUTH',
}

export class SetAuth implements Action {
  readonly type = AuthActionTypes.SET_AUTH;
  constructor(public user: User) {}
}

export class ClearAuth implements Action {
  readonly type = AuthActionTypes.CLEAR_AUTH;
}

export type AuthActions =
  | ClearAuth
  | SetAuth;
