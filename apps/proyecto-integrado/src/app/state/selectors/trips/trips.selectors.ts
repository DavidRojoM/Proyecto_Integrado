import { AppState } from '../../interfaces/app.state.interface';
import { createSelector } from '@ngrx/store';
import { TripsState } from '../../interfaces/trips.state.interface';

const selectTripsFeature = (state: AppState) => state.trips;

export const selectAllTrips = createSelector(
  selectTripsFeature,
  (partiesState: TripsState) => partiesState.trips
);
export const selectAllHotels = createSelector(
  selectTripsFeature,
  (partiesState: TripsState) => partiesState.hotels
);
export const selectAllTransports = createSelector(
  selectTripsFeature,
  (partiesState: TripsState) => partiesState.transports
);

export const selectAllDestinations = createSelector(
  selectTripsFeature,
  (partiesState: TripsState) => partiesState.destinations
);

export const selectTripsLoading = createSelector(
  selectTripsFeature,
  (partiesState: TripsState) => partiesState.loading
);
