import {createReducer, on} from '@ngrx/store';
import {falseDashboard, trueDashboard} from './dashboard.actions';


export interface State {
  dashboard: boolean;
}

export const initialState: State = {
  dashboard: false
};

const _dashboardReducer = createReducer(
  initialState,
  on(falseDashboard, (state) => ({...state, dashboard: false})),
  on(trueDashboard, (state) => ({...state, dashboard: true}))
);

export function dashboardReducer(state, action) {
  return _dashboardReducer(state, action);
}
