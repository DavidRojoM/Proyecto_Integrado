import {
  ErrorPayload,
  Result,
  Transport,
  TransportDto,
  Trip,
  TripDto,
} from '@proyecto-integrado/shared';

export type FindAllTripsResponse = Result<TripDto[], ErrorPayload>;
export type FindAllTransportsResponse = Result<TransportDto[], ErrorPayload>;

export type InsertTripResponse = Result<TripDto, ErrorPayload>;
export type InsertTransportResponse = Result<TransportDto, ErrorPayload>;

export type InsertTrip = Result<Trip, ErrorPayload>;
export type InsertTransport = Result<Transport, ErrorPayload>;
