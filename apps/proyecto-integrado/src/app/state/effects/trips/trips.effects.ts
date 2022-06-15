import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TripService } from '../../../core/shared/modules/trips/services/trip.service';
import { SnackbarService } from '../../../core/shared/services/snackbar.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { TripsActionTypes } from '../../actions/trips/trips-action.types.enum';

@Injectable()
export class TripsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly tripsService: TripService,
    private readonly snackbarService: SnackbarService
  ) {}

  findAllTripsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActionTypes.GET_TRIPS_REQUEST),
      switchMap(() =>
        this.tripsService.getTrips().pipe(
          map((trips) => ({
            type: TripsActionTypes.GET_TRIPS_SUCCESS,
            trips,
          })),
          catchError((error) => {
            return of({
              type: TripsActionTypes.GET_TRIPS_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  findAllTripsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TripsActionTypes.GET_TRIPS_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Error while retrieving trips',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  findAllTransportsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActionTypes.GET_TRANSPORTS_REQUEST),
      switchMap(() =>
        this.tripsService.getTransports().pipe(
          map((transports) => ({
            type: TripsActionTypes.GET_TRANSPORTS_SUCCESS,
            transports,
          })),
          catchError((error) => {
            return of({
              type: TripsActionTypes.GET_TRANSPORTS_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  findAllTransportsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TripsActionTypes.GET_TRANSPORTS_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Error while retrieving transports',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  findAllHotelsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActionTypes.GET_HOTELS_REQUEST),
      switchMap(() =>
        this.tripsService.getHotels().pipe(
          map((hotels) => ({
            type: TripsActionTypes.GET_HOTELS_SUCCESS,
            hotels,
          })),
          catchError((error) => {
            return of({
              type: TripsActionTypes.GET_HOTELS_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  findAllHotelsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TripsActionTypes.GET_HOTELS_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Error while retrieving hotels',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  findAllDestinationsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActionTypes.GET_DESTINATIONS_REQUEST),
      switchMap(() =>
        this.tripsService.getDestinations().pipe(
          map((destinations) => ({
            type: TripsActionTypes.GET_DESTINATIONS_SUCCESS,
            destinations,
          })),
          catchError((error) => {
            return of({
              type: TripsActionTypes.GET_DESTINATIONS_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  findAllDestinationsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TripsActionTypes.GET_DESTINATIONS_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Error while retrieving destinations',
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
