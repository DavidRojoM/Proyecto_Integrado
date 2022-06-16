import { AppState } from '../../interfaces/app.state.interface';
import { createSelector } from '@ngrx/store';
import { TripsState } from '../../interfaces/trips.state.interface';

const selectTripsFeature = (state: AppState) => state.trips;

export const selectAllTrips = createSelector(
  selectTripsFeature,
  (tripsState: TripsState) => tripsState.trips
);
export const selectAllHotels = createSelector(
  selectTripsFeature,
  (tripsState: TripsState) => tripsState.hotels
);
export const selectAllTransports = createSelector(
  selectTripsFeature,
  (tripsState: TripsState) => tripsState.transports
);

export const selectAllDestinations = createSelector(
  selectTripsFeature,
  (tripsState: TripsState) => tripsState.destinations
);

export const selectTripsLoading = createSelector(
  selectTripsFeature,
  (tripsState: TripsState) => tripsState.loading
);
