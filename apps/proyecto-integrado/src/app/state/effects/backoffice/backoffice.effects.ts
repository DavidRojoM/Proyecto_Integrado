import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarService } from '../../../core/shared/services/snackbar.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/app.state.interface';
import { AuthService } from '../../../core/shared/modules/auth/services/auth.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { BackOfficeActionTypes } from '../../actions/backoffice/back-office-action.types.enum';
import { UsersService } from '../../../core/shared/modules/users/services/users.service';
import { PartiesService } from '../../../core/shared/modules/parties/services/parties.service';
import { TripService } from '../../../core/shared/modules/trips/services/trip.service';

@Injectable()
export class BackofficeEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<AppState>,
    private readonly snackbarService: SnackbarService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly partiesService: PartiesService,
    private readonly tripService: TripService
  ) {}

  findUsersRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.FIND_USERS_REQUEST),
      switchMap(() =>
        this.usersService.findUsers().pipe(
          map((users) => ({
            type: BackOfficeActionTypes.FIND_USERS_SUCCESS,
            users,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.FIND_USERS_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  findUsersFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.FIND_USERS_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not retrieve users',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  addUserRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.ADD_USER_REQUEST),
      switchMap(({ user }) =>
        this.authService.signup(user).pipe(
          map((user) => ({
            type: BackOfficeActionTypes.ADD_USER_SUCCESS,
            user,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.ADD_USER_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  addUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.ADD_USER_FAILURE),
        tap(() => {
          this.snackbarService.open('Could not dialog user', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  updateUserRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.EDIT_USER_REQUEST),
      switchMap(({ user }) =>
        this.usersService.updateUser(user).pipe(
          map((user) => ({
            type: BackOfficeActionTypes.EDIT_USER_SUCCESS,
            user,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.EDIT_USER_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.EDIT_USER_FAILURE),
        tap(() => {
          this.snackbarService.open('Could not edit user', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  deleteUserRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.DELETE_USER_REQUEST),
      switchMap(({ userId }) =>
        this.usersService.deleteUser(userId).pipe(
          map(({ userId }) => ({
            type: BackOfficeActionTypes.DELETE_USER_SUCCESS,
            userId,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.DELETE_USER_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  deleteUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.DELETE_USER_FAILURE),
        tap(() => {
          this.snackbarService.open('Could not delete user', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  addPartyRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.ADD_PARTY_REQUEST),
      switchMap(({ name }) =>
        this.partiesService.createParty(name).pipe(
          map((party) => ({
            type: BackOfficeActionTypes.ADD_PARTY_SUCCESS,
            party,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.ADD_PARTY_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  addPartyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.ADD_PARTY_FAILURE),
        tap(() => {
          this.snackbarService.open('Could not create party', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  deletePartyRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.DELETE_PARTY_REQUEST),
      switchMap(({ partyId }) =>
        this.partiesService.deleteParty(partyId).pipe(
          map(({ partyId }) => ({
            type: BackOfficeActionTypes.DELETE_PARTY_SUCCESS,
            partyId,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.DELETE_PARTY_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  deletePartyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.DELETE_PARTY_FAILURE),
        tap(() => {
          this.snackbarService.open('Could not delete party', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  editPartyRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.EDIT_PARTY_REQUEST),
      switchMap(({ party }) =>
        this.partiesService.updateParty(party).pipe(
          map((party) => ({
            type: BackOfficeActionTypes.EDIT_PARTY_SUCCESS,
            party,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.EDIT_PARTY_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  editPartyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.EDIT_PARTY_FAILURE),
        tap(() => {
          this.snackbarService.open('Could not edit party', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  addTransportRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.ADD_TRANSPORT_REQUEST),
      switchMap(({ transport }) =>
        this.tripService.createTransport(transport).pipe(
          map((transport) => ({
            type: BackOfficeActionTypes.ADD_TRANSPORT_SUCCESS,
            transport,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.ADD_TRANSPORT_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  addTransportFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.ADD_TRANSPORT_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not dialog transport',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  deleteTransport$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.DELETE_TRANSPORT_REQUEST),
      switchMap(({ transportId }) =>
        this.tripService.deleteTransport(transportId).pipe(
          map(({ transportId }) => ({
            type: BackOfficeActionTypes.DELETE_TRANSPORT_SUCCESS,
            transportId,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.DELETE_TRANSPORT_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  deleteTransportFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.DELETE_TRANSPORT_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not delete transport',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  editTransportRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.EDIT_TRANSPORT_REQUEST),
      switchMap(({ transport }: any) =>
        this.tripService
          .updateTransport({ ...transport, price: Number(transport.price) })
          .pipe(
            map((transport) => ({
              type: BackOfficeActionTypes.EDIT_TRANSPORT_SUCCESS,
              transport,
            })),
            catchError((error) => {
              return of({
                type: BackOfficeActionTypes.EDIT_TRANSPORT_FAILURE,
                error,
              });
            })
          )
      )
    )
  );

  editTransportFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.DELETE_TRANSPORT_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not edit transport',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  //  ////////|////////////////////////////////////////////////////////////////////

  addHotelRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.ADD_HOTEL_REQUEST),
      switchMap(({ hotel }) =>
        this.tripService.createHotel(hotel).pipe(
          map((hotel) => ({
            type: BackOfficeActionTypes.ADD_HOTEL_SUCCESS,
            hotel,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.ADD_HOTEL_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  addHotelFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.ADD_HOTEL_FAILURE),
        tap(() => {
          this.snackbarService.open('Could not dialog hotel', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  deleteHotel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.DELETE_HOTEL_REQUEST),
      switchMap(({ hotelId }) =>
        this.tripService.deleteHotel(hotelId).pipe(
          map(({ hotelId }) => ({
            type: BackOfficeActionTypes.DELETE_HOTEL_SUCCESS,
            hotelId,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.DELETE_HOTEL_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  deleteHotelFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.DELETE_HOTEL_FAILURE),
        tap(() => {
          this.snackbarService.open('Could not delete hotel', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  editHotelRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.EDIT_HOTEL_REQUEST),
      switchMap(({ hotel }: any) =>
        this.tripService
          .updateHotel({ ...hotel, nightPrice: Number(hotel.nightPrice) })
          .pipe(
            map((hotel) => ({
              type: BackOfficeActionTypes.EDIT_HOTEL_SUCCESS,
              hotel,
            })),
            catchError((error) => {
              return of({
                type: BackOfficeActionTypes.EDIT_HOTEL_FAILURE,
                error,
              });
            })
          )
      )
    )
  );

  editHotelFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.DELETE_HOTEL_FAILURE),
        tap(() => {
          this.snackbarService.open('Could not edit hotel', 'DISMISS', 2000);
        })
      ),
    {
      dispatch: false,
    }
  );

  //////////////////////////////////////////////////////////////////////////

  addDestinationRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.ADD_DESTINATION_REQUEST),
      switchMap(({ destination }) =>
        this.tripService.createDestination(destination).pipe(
          map((destination) => ({
            type: BackOfficeActionTypes.ADD_DESTINATION_SUCCESS,
            destination,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.ADD_DESTINATION_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  addDestinationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.ADD_DESTINATION_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not dialog destination',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  deleteDestination$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.DELETE_DESTINATION_REQUEST),
      switchMap(({ destinationId }) =>
        this.tripService.deleteDestination(destinationId).pipe(
          map(({ destinationId }) => ({
            type: BackOfficeActionTypes.DELETE_DESTINATION_SUCCESS,
            destinationId,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.DELETE_DESTINATION_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  deleteDestinationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.DELETE_DESTINATION_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not delete destination',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  editDestinationRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BackOfficeActionTypes.EDIT_DESTINATION_REQUEST),
      switchMap(({ destination }) =>
        this.tripService.updateDestination(destination).pipe(
          map((destination) => ({
            type: BackOfficeActionTypes.EDIT_DESTINATION_SUCCESS,
            destination,
          })),
          catchError((error) => {
            return of({
              type: BackOfficeActionTypes.EDIT_DESTINATION_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  editDestinationFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BackOfficeActionTypes.DELETE_DESTINATION_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Could not edit destination',
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
