import {
  Destination,
  Hotel,
  Transport,
  Trip,
} from '../../core/shared/modules/trips/domain/trips.interface';

export interface TripsState {
  trips: Trip[];
  hotels: Hotel[];
  transports: Transport[];
  destinations: Destination[];
  loading: boolean;
}
