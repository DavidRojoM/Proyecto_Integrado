import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../domain/country.interface';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countries: Country[] = [];
  endpoint = 'https://restcountries.com/v3.1/all';
  constructor(private readonly httpService: HttpClient) {}

  findAll() {
    if (this.countries.length) {
      return of(this.countries);
    }
    return this.httpService.get<Country[]>(this.endpoint).pipe(
      tap((countries) => {
        this.countries = countries;
      })
    );
  }
}
