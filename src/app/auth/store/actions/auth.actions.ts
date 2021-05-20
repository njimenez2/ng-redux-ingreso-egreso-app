import {createAction, props} from '@ngrx/store';
import {User} from '../../../firebase/models/User';

export const setUser = createAction(
  '[AUTH Component] setUser',
  props<{ user: User }>()
);

export const unSetUser = createAction(
  '[AUTH Component] unSetUser');

