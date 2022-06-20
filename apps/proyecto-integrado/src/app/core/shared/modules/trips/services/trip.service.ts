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
import { map, Observable } from 'rxjs';
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
    return this.http.post<Transport>(this.transports_url, {
      brand: transport.brand,
      name: transport.name,
      price: transport.price,
      type: transport.type,
    });
  }

  createHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.hotels_url, {
      address: hotel.address,
      name: hotel.name,
      image: hotel.image,
      nightPrice: hotel.nightPrice,
      phone: hotel.phone,
    });
  }

  createDestination(destination: Destination): Observable<Destination> {
    return this.http.post<Destination>(this.destinations_url, {
      name: destination.name,
      description: destination.description,
    });
  }

  deleteTransport(transportId: string): Observable<{ transportId: number }> {
    return this.http
      .delete<{ transportId: number }>(`${this.transports_url}/${transportId}`)
      .pipe(
        map((response) => {
          return {
            transportId: Number(response.transportId),
          };
        })
      );
  }

  deleteHotel(hotelId: string): Observable<{ hotelId: number }> {
    return this.http
      .delete<{ hotelId: number }>(`${this.hotels_url}/${hotelId}`)
      .pipe(
        map((response) => {
          return {
            hotelId: Number(response.hotelId),
          };
        })
      );
  }

  deleteDestination(
    destinationId: string
  ): Observable<{ destinationId: number }> {
    return this.http
      .delete<{ destinationId: number }>(
        `${this.destinations_url}/${destinationId}`
      )
      .pipe(
        map((response) => {
          return {
            destinationId: Number(response.destinationId),
          };
        })
      );
  }

  updateTransport(transport: Transport): Observable<Transport> {
    return this.http.put<Transport>(this.transports_url, transport).pipe(
      map((response) => {
        return {
          ...response,
          id: Number(response.id),
        };
      })
    );
  }

  updateHotel(hotel: Hotel): Observable<Hotel> {
    return this.http.put<Hotel>(this.hotels_url, hotel).pipe(
      map((response) => {
        return {
          ...response,
          id: Number(response.id),
        };
      })
    );
  }

  updateDestination(destination: Destination): Observable<Destination> {
    return this.http.put<Destination>(this.destinations_url, destination).pipe(
      map((response) => {
        return {
          ...response,
          id: Number(response.id),
        };
      })
    );
  }
}
