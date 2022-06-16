import { AbstractControl } from '@angular/forms';
import { Country } from './country.interface';
import {
  Destination,
  Hotel,
  Transport,
} from '../../trips/domain/trips.interface';

export function CountryValidator(countries: Country[]) {
  return (control: AbstractControl) => {
    return countries.find((country) => country.name.common === control.value)
      ? null
      : { valid: false };
  };
}

export function TransportValidator(transports: Transport[]) {
  return (control: AbstractControl) => {
    return transports.find((transport) => transport.name === control.value)
      ? null
      : { valid: false };
  };
}

export function HotelValidator(hotels: Hotel[]) {
  return (control: AbstractControl) => {
    return hotels.find((hotel) => hotel.name === control.value)
      ? null
      : { valid: false };
  };
}

export function DestinationValidator(destinations: Destination[]) {
  return (control: AbstractControl) => {
    return destinations.find(
      (destination) => destination.name === control.value
    )
      ? null
      : { valid: false };
  };
}
