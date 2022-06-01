import {
  Destination,
  DestinationDto,
  ErrorPayload,
  Hotel,
  HotelDto,
  Result,
  Transport,
  TransportDto,
  Trip,
  TripDto,
} from '@proyecto-integrado/shared';

export type FindAllTripsResponse = Result<TripDto[], ErrorPayload>;
export type FindAllTransportsResponse = Result<TransportDto[], ErrorPayload>;
export type FindAllHotelsResponse = Result<HotelDto[], ErrorPayload>;
export type FindAllDestinationsResponse = Result<
  DestinationDto[],
  ErrorPayload
>;

export type InsertTripResponse = Result<TripDto, ErrorPayload>;
export type InsertTransportResponse = Result<TransportDto, ErrorPayload>;
export type InsertHotelResponse = Result<HotelDto, ErrorPayload>;
export type InsertDestinationResponse = Result<DestinationDto, ErrorPayload>;

export type InsertTrip = Result<Trip, ErrorPayload>;
export type InsertTransport = Result<Transport, ErrorPayload>;
export type InsertHotel = Result<Hotel, ErrorPayload>;
export type InsertDestination = Result<Destination, ErrorPayload>;