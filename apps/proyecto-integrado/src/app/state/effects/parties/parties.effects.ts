import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PartiesService } from '../../../core/shared/modules/parties/services/parties.service';
import { SnackbarService } from '../../../core/shared/services/snackbar.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { PartiesActionTypes } from '../../actions/parties/parties-action.types.enum';

@Injectable()
export class PartiesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly partiesService: PartiesService,
    private readonly snackbarService: SnackbarService
  ) {}

  findAllRequest$ = createEffect(() =>
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
        ofType(PartiesActionTypes.GET_PARTIES_FAILURE),
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

  joinPartyRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.JOIN_PARTY_REQUEST),
      switchMap(({ userId, partyId }) =>
        this.partiesService.joinParty(userId, partyId).pipe(
          map((user) => ({
            type: PartiesActionTypes.JOIN_PARTY_SUCCESS,
            user,
            partyId,
          })),
          catchError((error) => {
            return of({
              type: PartiesActionTypes.JOIN_PARTY_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  joinPartyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PartiesActionTypes.JOIN_PARTY_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not join the party',
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
