import { createAction, props } from '@ngrx/store';
import { User } from '../../auth/models/user.model';

export const loadUsers = createAction('[Dashboard] Load Users');
export const loadUsersSuccess = createAction(
  '[Dashboard] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Dashboard] Load Users Failure',
  props<{ error: string }>()
);

export const updateUser = createAction(
  '[Dashboard] Update User',
  props<{ user: User }>()
);
export const updateUserSuccess = createAction(
  '[Dashboard] Update User Success',
  props<{ user: User }>()
);
export const updateUserFailure = createAction(
  '[Dashboard] Update User Failure',
  props<{ error: string }>()
);
