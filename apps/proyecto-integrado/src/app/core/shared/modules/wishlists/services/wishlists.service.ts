import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Wishlist,
  WishlistInput,
} from '../domain/interfaces/wishlist.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistsService {
  url = `${environment.GATEWAY_URL}/wishlists`;

  constructor(private readonly http: HttpClient) {}

  getWishlists(): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(this.url);
  }

  createWishlist(wishlist: Wishlist): Observable<Wishlist> {
    const body: Partial<WishlistInput> = {
      userId: wishlist.user.id,
      destinationId: wishlist.destination.id,
    };
    if (wishlist.ageFilter) {
      body.ageFilter = wishlist.ageFilter;
    }
    if (wishlist.genderFilter) {
      body.genderFilter = wishlist.genderFilter;
    }
    if (wishlist.departureFilter) {
      body.departureFilter = wishlist.departureFilter;
    }

    return this.http.post<Wishlist>(this.url, body);
  }
}
