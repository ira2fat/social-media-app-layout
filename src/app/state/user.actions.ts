import { createAction, props } from '@ngrx/store';

export const loginUser = createAction(
  '[User] Login User',
  props<{ username: string; password: string }>()
);
export const logoutUser = createAction('[User] Logout User');
export const updateUserProfile = createAction(
  '[User] Update Profile',
  props<{ user: any }>()
);