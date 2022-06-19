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
import { TripsActionTypes } from '../../actions/trips/trips-action.types.enum';
import { User } from '../../../core/shared/modules/users/domain/interfaces/user.interface';

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
      withLatestFrom(this.store$.select(selectUser)),
      switchMap(([{ partyId }, user]) =>
        this.partiesService.joinParty(user.id, partyId).pipe(
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

  addToPartyRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.ADD_TO_PARTY_REQUEST),
      switchMap(({ userId, partyId }) =>
        this.partiesService.joinParty(userId, partyId).pipe(
          map(({ user, party }) => ({
            type: PartiesActionTypes.ADD_TO_PARTY_SUCCESS,
            user,
            party,
          })),
          catchError((error) => {
            return of({
              type: PartiesActionTypes.ADD_TO_PARTY_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  addToPartyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PartiesActionTypes.ADD_TO_PARTY_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not add to the party',
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
      withLatestFrom(this.store$.select(selectUser)),
      switchMap(([{ partyId }, user]) =>
        this.partiesService.leaveParty(user.id, partyId).pipe(
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
      map(([{ party }, user]) => ({
        type: PartiesActionTypes.JOIN_PARTY_REQUEST,
        userId: user.id,
        partyId: (party as PartyInput).id,
      }))
    )
  );

  createTripSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActionTypes.CREATE_TRIP_SUCCESS),
      map(({ trip, partyId }) => ({
        type: PartiesActionTypes.ADD_TRIP_REQUEST,
        trip,
        partyId,
      }))
    )
  );

  addTripRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.ADD_TRIP_REQUEST),
      switchMap(({ trip, partyId }) =>
        this.partiesService.createTrip({ trip, partyId }).pipe(
          map(({ partyId, trip }) => ({
            type: PartiesActionTypes.ADD_TRIP_SUCCESS,
            partyId,
            trip,
          })),
          catchError((error) => {
            return of({
              type: PartiesActionTypes.ADD_TRIP_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  addTripFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PartiesActionTypes.ADD_TRIP_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could add the trip to the party',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  checkoutRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.CHECKOUT_PARTY_REQUEST),
      withLatestFrom(this.store$.select(selectUser)),
      switchMap(([{ partyId }, user]: [{ partyId: string }, User]) =>
        this.partiesService.checkout(partyId, user.id).pipe(
          map((response) => ({
            type: PartiesActionTypes.CHECKOUT_PARTY_SUCCESS,
            partyId: response.partyId,
            userId: response.userId,
            balances: response.balances,
          })),
          catchError((error) => {
            return of({
              type: PartiesActionTypes.CHECKOUT_PARTY_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  checkoutFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PartiesActionTypes.CHECKOUT_PARTY_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not checkout the party',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  cancelCheckoutRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.CANCEL_CHECKOUT_PARTY_REQUEST),
      withLatestFrom(this.store$.select(selectUser)),
      switchMap(([{ partyId }, user]: [{ partyId: string }, User]) =>
        this.partiesService.cancelCheckout(partyId, user.id).pipe(
          map((response) => ({
            type: PartiesActionTypes.CANCEL_CHECKOUT_PARTY_SUCCESS,
            partyId: response.partyId,
            userId: response.userId,
            balances: response.balances,
          })),
          catchError((error) => {
            return of({
              type: PartiesActionTypes.CANCEL_CHECKOUT_PARTY_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  cancelCheckoutFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PartiesActionTypes.CANCEL_CHECKOUT_PARTY_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not cancel the checkout',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  confirmPartyRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PartiesActionTypes.CONFIRM_PARTY_REQUEST),
      withLatestFrom(this.store$.select(selectUser)),
      switchMap(([{ partyId }, user]: [{ partyId: string }, User]) =>
        this.partiesService.confirmParty(partyId, user.id).pipe(
          map((response) => ({
            type: PartiesActionTypes.CONFIRM_PARTY_SUCCESS,
            partyId: response.partyId,
            userId: response.userId,
            balances: response.balances,
          })),
          catchError((error) => {
            return of({
              type: PartiesActionTypes.CONFIRM_PARTY_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  confirmPartyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PartiesActionTypes.CONFIRM_PARTY_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not confirm the party',
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
