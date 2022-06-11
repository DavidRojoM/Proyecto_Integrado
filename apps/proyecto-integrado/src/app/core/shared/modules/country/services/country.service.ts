import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../domain/country.interface';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countries: Country[] = [];
  endpoint = environment.COUNTRIES_URL;
  constructor(private readonly httpService: HttpClient) {}

  findAll(): Observable<Country[]> {
    if (this.countries.length) {
      return of(this.countries);
    }
    return this.httpService.get<Country[]>(this.endpoint).pipe(
      tap((countries) => {
        this.countries = countries;
      })
    );
  }

  findOne(countryName: string): Observable<Country | undefined> {
    if (this.countries.length) {
      return of(
        this.countries.find((country) => country.name.common === countryName)
      );
    }
    return this.httpService.get<Country[]>(this.endpoint).pipe(
      tap((countries) => {
        this.countries = countries;
      }),
      map((countries) =>
        countries.find((country) => country.name.common === countryName)
      )
    );
  }
}
