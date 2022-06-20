import { TripsState } from '../../interfaces/trips.state.interface';
import { createReducer, on } from '@ngrx/store';
import { TripsActions } from '../../actions/trips/trips.actions';
import { BackofficeActions } from '../../actions/backoffice/backoffice.actions';

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
  })),
  on(BackofficeActions.addDestinationRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.addDestinationSuccess, (state, { destination }) => ({
    ...state,
    loading: false,
    destinations: [...state.destinations, destination],
  })),
  on(BackofficeActions.addDestinationFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(BackofficeActions.addTransportRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.addTransportSuccess, (state, { transport }) => ({
    ...state,
    loading: false,
    transports: [...state.transports, transport],
  })),
  on(BackofficeActions.addTransportFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(BackofficeActions.addHotelRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.addHotelSuccess, (state, { hotel }) => ({
    ...state,
    loading: false,
    hotels: [...state.hotels, hotel],
  })),
  on(BackofficeActions.addHotelFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(BackofficeActions.deleteDestinationRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    BackofficeActions.deleteDestinationSuccess,
    (state, { destinationId }) => ({
      ...state,
      loading: false,
      destinations: state.destinations.filter((d) => d.id !== destinationId),
    })
  ),
  on(BackofficeActions.deleteDestinationFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(BackofficeActions.deleteTransportRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.deleteTransportSuccess, (state, { transportId }) => ({
    ...state,
    loading: false,
    transports: state.transports.filter((t) => t.id !== transportId),
  })),
  on(BackofficeActions.deleteTransportFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(BackofficeActions.deleteHotelRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.deleteHotelSuccess, (state, { hotelId }) => ({
    ...state,
    loading: false,
    hotels: state.hotels.filter((h) => h.id !== hotelId),
  })),
  on(BackofficeActions.deleteHotelFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(BackofficeActions.editDestinationRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.editDestinationSuccess, (state, { destination }) => ({
    ...state,
    loading: false,
    destinations: state.destinations.map((d) =>
      d.id === destination.id ? destination : d
    ),
  })),
  on(BackofficeActions.editDestinationFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(BackofficeActions.editTransportRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.editTransportSuccess, (state, { transport }) => ({
    ...state,
    loading: false,
    transports: state.transports.map((t) =>
      t.id === transport.id ? transport : t
    ),
  })),
  on(BackofficeActions.editTransportFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(BackofficeActions.editHotelRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(BackofficeActions.editHotelSuccess, (state, { hotel }) => ({
    ...state,
    loading: false,
    hotels: state.hotels.map((h) => (h.id === hotel.id ? hotel : h)),
  })),
  on(BackofficeActions.editHotelFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  }))
);
