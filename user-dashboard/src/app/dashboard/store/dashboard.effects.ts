import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DashboardService } from '../services/dashboard.service';
import * as DashboardActions from './dashboard.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadUsers),
      mergeMap(() =>
        this.dashboardService.getUsers().pipe(
          map((users) => DashboardActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(
              DashboardActions.loadUsersFailure({
                error: error.message || 'Failed to load users',
              })
            )
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.updateUser),
      mergeMap(({ user }) =>
        this.dashboardService.updateUser(user).pipe(
          map((updatedUser) =>
            DashboardActions.updateUserSuccess({ user: updatedUser })
          ),
          catchError((error) =>
            of(
              DashboardActions.updateUserFailure({
                error: error.message || 'Failed to update user',
              })
            )
          )
        )
      )
    )
  );
}
