import {createReducer, on} from '@ngrx/store';
import {User} from '../../../firebase/models/User';
import {setUser, unSetUser} from '../actions';


export interface UserState {
  user: User;
}

export const initialState: UserState = {
  user: null
};

const _authReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => ({...state, user: {...user}})),
  on(unSetUser, (state) => ({...state, user: null})),
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
