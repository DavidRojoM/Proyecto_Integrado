import { AbstractControl } from '@angular/forms';
import { Country } from './country.interface';

export function CountryValidator(countries: Country[]) {
  return (control: AbstractControl) => {
    return countries.find((country) => country.name.common === control.value)
      ? null
      : { valid: false };
  };
}
