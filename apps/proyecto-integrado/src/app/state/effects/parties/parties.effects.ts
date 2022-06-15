import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PartiesService } from '../../../core/shared/modules/parties/services/parties.service';
import { SnackbarService } from '../../../core/shared/services/snackbar.service';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { PartiesActionTypes } from '../../actions/parties/parties-action.types.enum';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/app.state.interface';
import { selectUser } from '../../selectors/auth/auth.selectors';
import { PartyInput } from '../../../core/shared/modules/parties/domain/parties.interface';

@Injectable()
export class PartiesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly partiesService: PartiesService,
    private readonly snackbarService: SnackbarService,
    private readonly store$: Store<AppState>
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
          map(({ user, party }) => ({
            type: PartiesActionTypes.JOIN_PARTY_SUCCESS,
            user,
            party,
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

  leavePartyRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.LEAVE_PARTY_REQUEST),
      switchMap(({ userId, partyId }) =>
        this.partiesService.leaveParty(userId, partyId).pipe(
          map(({ userId, partyId }) => ({
            type: PartiesActionTypes.LEAVE_PARTY_SUCCESS,
            userId,
            partyId,
          })),
          catchError((error) => {
            return of({
              type: PartiesActionTypes.LEAVE_PARTY_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  leavePartyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PartiesActionTypes.LEAVE_PARTY_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not leave the party',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  becomeOrganizerRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.BECOME_ORGANIZER_REQUEST),
      switchMap(({ userId, partyId }) =>
        this.partiesService.becomeOrganizer(userId, partyId).pipe(
          map(({ user, party }) => ({
            type: PartiesActionTypes.BECOME_ORGANIZER_SUCCESS,
            user,
            party,
          })),
          catchError((error) => {
            return of({
              type: PartiesActionTypes.BECOME_ORGANIZER_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  createPartyRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.CREATE_PARTY_REQUEST),
      switchMap(({ name }) =>
        this.partiesService.createParty(name).pipe(
          map((party) => ({
            type: PartiesActionTypes.CREATE_PARTY_SUCCESS,
            party,
          })),
          catchError((error) => {
            return of({
              type: PartiesActionTypes.CREATE_PARTY_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  createPartyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PartiesActionTypes.CREATE_PARTY_FAILURE),
        tap(() => {
          this.snackbarService.open('Could create the party', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  createPartySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.CREATE_PARTY_SUCCESS),
      withLatestFrom(this.store$.select(selectUser)),
      map(
        ([{ party }, user]) => ({
          type: PartiesActionTypes.JOIN_PARTY_REQUEST,
          userId: user.id,
          partyId: (party as PartyInput).id,
        })
        // switchMap(([{ id }, user]) =>
        //   this.partiesService.joinParty(id, user.id).pipe(
        //     map((party) => ({
        //       type: PartiesActionTypes.JOIN_PARTY_REQUEST,
        //       party,
        //     })),
        //     catchError((error) => {
        //       return of({
        //         type: PartiesActionTypes.JOIN_PARTY_FAILURE,
        //         error,
        //       });
        //     })
        //   )
        // )
      )
    )
  );
}
