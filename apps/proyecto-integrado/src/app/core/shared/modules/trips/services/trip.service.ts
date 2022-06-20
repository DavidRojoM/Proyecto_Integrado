import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import {
  Destination,
  Hotel,
  Transport,
  Trip,
  TripInput,
} from '../domain/trips.interface';
import { Observable } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';
@Injectable({
  providedIn: 'root',
})
export class TripService {
  trips_url = `${environment.GATEWAY_URL}/trips`;
  transports_url = `${environment.GATEWAY_URL}/transports`;
  hotels_url = `${environment.GATEWAY_URL}/hotels`;
  destinations_url = `${environment.GATEWAY_URL}/destinations`;

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.trips_url);
  }

  getTransports(): Observable<Transport[]> {
    return this.http.get<Transport[]>(this.transports_url);
  }

  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotels_url);
  }

  getDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.destinations_url);
  }

  createTrip(trip: Trip): Observable<Trip> {
    const tripInput: TripInput = {
      id: uuidV4(),
      from: trip.from,
      destinationId: trip.destination?.id,
      hotelId: trip.hotel?.id,
      transportId: trip.transport?.id,
      to: trip.to,
    };
    return this.http.post<Trip>(this.trips_url, tripInput);
  }

  createTransport(transport: Transport): Observable<Transport> {
    return this.http.post<Transport>(this.transports_url, transport);
  }

  createHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.hotels_url, hotel);
  }

  createDestination(destination: Destination): Observable<Destination> {
    return this.http.post<Destination>(this.destinations_url, destination);
  }

  deleteTransport(transportId: string): Observable<{ transportId: string }> {
    return this.http.delete<{ transportId: string }>(
      `${this.transports_url}/${transportId}`
    );
  }

  deleteHotel(hotelId: string): Observable<{ hotelId: string }> {
    return this.http.delete<{ hotelId: string }>(
      `${this.hotels_url}/${hotelId}`
    );
  }

  deleteDestination(
    destinationId: string
  ): Observable<{ destinationId: string }> {
    return this.http.delete<{ destinationId: string }>(
      `${this.destinations_url}/${destinationId}`
    );
  }

  updateTransport(transport: Transport): Observable<Transport> {
    return this.http.put<Transport>(this.transports_url, transport);
  }

  updateHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(this.hotels_url, hotel);
  }

  updateDestination(destination: Destination): Observable<Destination> {
    return this.http.put<Destination>(this.destinations_url, destination);
  }
}
