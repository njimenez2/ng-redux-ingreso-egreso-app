import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from '../reducers';

export const authKey = 'auth';

export const selectAuth = createFeatureSelector<UserState>(authKey);

export const selectAuthUserId = createSelector(
  selectAuth,
  (state: UserState) => {
    if (state.user != null) {
      return state.user.id;
    }
    else {
      return null;
    }
  }
);

