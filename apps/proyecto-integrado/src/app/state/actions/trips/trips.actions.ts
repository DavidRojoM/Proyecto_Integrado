import { createAction, props } from '@ngrx/store';
import { TripsActionTypes } from './trips-action.types.enum';
import {
  Destination,
  Hotel,
  Transport,
  Trip,
} from '../../../core/shared/modules/trips/domain/trips.interface';

export const TripsActions = {
  getAllTripsRequest: createAction(TripsActionTypes.GET_TRIPS_REQUEST),
  getAllTripsSuccess: createAction(
    TripsActionTypes.GET_TRIPS_SUCCESS,
    props<{ trips: Trip[] }>()
  ),
  getAllTripsFailure: createAction(
    TripsActionTypes.GET_TRIPS_FAILURE,
    props<{ error: string }>()
  ),
  getAllHotelsRequest: createAction(TripsActionTypes.GET_HOTELS_REQUEST),
  getAllHotelsSuccess: createAction(
    TripsActionTypes.GET_HOTELS_SUCCESS,
    props<{ hotels: Hotel[] }>()
  ),
  getAllHotelsFailure: createAction(
    TripsActionTypes.GET_HOTELS_FAILURE,
    props<{ error: string }>()
  ),
  getAllTransportsRequest: createAction(
    TripsActionTypes.GET_TRANSPORTS_REQUEST
  ),
  getAllTransportsSuccess: createAction(
    TripsActionTypes.GET_TRANSPORTS_SUCCESS,
    props<{ transports: Transport[] }>()
  ),
  getAllTransportsFailure: createAction(
    TripsActionTypes.GET_TRANSPORTS_FAILURE,
    props<{ error: string }>()
  ),
  getAllDestinationsRequest: createAction(
    TripsActionTypes.GET_DESTINATIONS_REQUEST
  ),
  getAllDestinationsSuccess: createAction(
    TripsActionTypes.GET_DESTINATIONS_SUCCESS,
    props<{ destinations: Destination[] }>()
  ),
  getAllDestinationsFailure: createAction(
    TripsActionTypes.GET_DESTINATIONS_FAILURE,
    props<{ error: string }>()
  ),
};
