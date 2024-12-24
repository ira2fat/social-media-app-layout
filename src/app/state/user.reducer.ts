import { createReducer, on } from '@ngrx/store';
import { loginUser, logoutUser, updateUserProfile } from './user.actions';

export interface UserState {
  user: any;
}

export const initialState: UserState = { user: null };

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state, { username }) => ({ ...state, user: { username } })),
  on(logoutUser, state => ({ ...state, user: null })),
  on(updateUserProfile, (state, { user }) => ({ ...state, user }))
);