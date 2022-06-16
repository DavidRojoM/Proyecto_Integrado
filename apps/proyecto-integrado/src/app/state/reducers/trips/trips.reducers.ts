import { TripsState } from '../../interfaces/trips.state.interface';
import { createReducer, on } from '@ngrx/store';
import { TripsActions } from '../../actions/trips/trips.actions';

const initialState: TripsState = {
  loading: false,
  trips: [],
  transports: [],
  hotels: [],
  destinations: [],
};

export const tripsReducer = createReducer(
  initialState,
  on(TripsActions.getAllTripsRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(TripsActions.getAllTripsSuccess, (state, { trips }) => ({
    ...state,
    loading: false,
    trips,
  })),
  on(TripsActions.getAllTripsFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(TripsActions.getAllTransportsRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(TripsActions.getAllTransportsSuccess, (state, { transports }) => ({
    ...state,
    loading: false,
    transports,
  })),
  on(TripsActions.getAllTransportsFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(TripsActions.getAllHotelsRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(TripsActions.getAllHotelsSuccess, (state, { hotels }) => ({
    ...state,
    loading: false,
    hotels,
  })),
  on(TripsActions.getAllHotelsFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(TripsActions.getAllDestinationsRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(TripsActions.getAllDestinationsSuccess, (state, { destinations }) => ({
    ...state,
    loading: false,
    destinations,
  })),
  on(TripsActions.getAllDestinationsFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(TripsActions.createTripRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(TripsActions.createTripSuccess, (state, { trip }) => ({
    ...state,
    loading: false,
    trips: [...state.trips, trip],
  })),
  on(TripsActions.createTripFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  }))
);
