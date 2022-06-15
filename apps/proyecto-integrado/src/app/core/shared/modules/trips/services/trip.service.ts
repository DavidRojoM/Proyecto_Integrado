import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { Destination, Hotel, Transport, Trip } from '../domain/trips.interface';
import { Observable } from 'rxjs';

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
}
