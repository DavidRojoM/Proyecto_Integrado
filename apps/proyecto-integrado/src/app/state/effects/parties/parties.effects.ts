import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PartiesService } from '../../../core/shared/modules/parties/services/parties.service';
import { SnackbarService } from '../../../core/shared/services/snackbar.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PartiesActionTypes } from '../../actions/parties/parties-action.types.enum';
import { AuthActionTypes } from '../../actions/auth/auth-action.types.enum';

@Injectable()
export class PartiesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly partiesService: PartiesService,
    private readonly snackbarService: SnackbarService
  ) {}

  findAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.GET_PARTIES_REQUEST),
      switchMap(() =>
        this.partiesService.findAll().pipe(
          map((parties) => ({
            type: PartiesActionTypes.GET_PARTIES_SUCCESS,
            parties,
          })),
          catchError((error) => {
            return of({
              type: PartiesActionTypes.GET_PARTIES_FAILURE,
              error,
            });
          })
        )
      )
    )
  );
  findAllFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.CHECK_AUTH_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Error while retrieving parties',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );
}
