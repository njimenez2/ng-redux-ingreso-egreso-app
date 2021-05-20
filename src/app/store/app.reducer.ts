import {ActionReducerMap} from '@ngrx/store';
import * as ui from '../shared/ui.reducer';
import * as auth from '../auth/store/reducers';


export interface AppState {
  ui: ui.State;
  auth: auth.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
};
