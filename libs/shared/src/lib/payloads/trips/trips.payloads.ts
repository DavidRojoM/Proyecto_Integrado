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

export interface FindTripByIdPayload {
  id: string;
}

export type FindAllTripsResponse = Result<TripDto[], ErrorPayload>;
export type FindAllTransportsResponse = Result<TransportDto[], ErrorPayload>;
export type FindAllHotelsResponse = Result<HotelDto[], ErrorPayload>;
export type FindAllDestinationsResponse = Result<
  DestinationDto[],
  ErrorPayload
>;

export type DeleteTripAggregateResponse = Result<{ id: number }, ErrorPayload>;
export type InsertTripResponse = Result<Trip, ErrorPayload>;
export type FindTripResponse = Result<Trip, ErrorPayload>;
export type InsertTransportResponse = Result<TransportDto, ErrorPayload>;
export type InsertHotelResponse = Result<HotelDto, ErrorPayload>;
export type InsertDestinationResponse = Result<DestinationDto, ErrorPayload>;
export type UpdateTransportResponse = Result<TransportDto, ErrorPayload>;
export type UpdateHotelResponse = Result<HotelDto, ErrorPayload>;
export type UpdateDestinationResponse = Result<DestinationDto, ErrorPayload>;

export type UpdateTransport = Result<Transport, ErrorPayload>;
export type UpdateHotel = Result<Hotel, ErrorPayload>;
export type UpdateDestination = Result<Destination, ErrorPayload>;
export type InsertTrip = Result<Trip, ErrorPayload>;
export type FindTrip = Result<Trip, ErrorPayload>;
export type InsertTransport = Result<Transport, ErrorPayload>;
export type InsertHotel = Result<Hotel, ErrorPayload>;
export type InsertDestination = Result<Destination, ErrorPayload>;

export type FindDestination = Result<Destination, ErrorPayload>;
