import { createReducer, on } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';
import { DashboardState, initialDashboardState } from './dashboard.state';

export const dashboardReducer = createReducer(
  initialDashboardState,
  on(DashboardActions.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DashboardActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    loading: false,
    users,
  })),
  on(DashboardActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(DashboardActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DashboardActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
  })),
  on(DashboardActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
