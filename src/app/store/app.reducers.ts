import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';


import * as fromReducers from './reducers';

export interface IAppState {
  auth: fromReducers.IAuthState;
}

export const appReducers: ActionReducerMap<IAppState, any> = {
  auth: fromReducers.authReducer,
};
