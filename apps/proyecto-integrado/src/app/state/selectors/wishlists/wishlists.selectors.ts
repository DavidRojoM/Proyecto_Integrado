import { AppState } from '../../interfaces/app.state.interface';
import { createSelector } from '@ngrx/store';
import { WishlistsState } from '../../interfaces/wishlists.state.interface';

const selectWishlistsFeature = (state: AppState) => state.wishlists;

export const selectWishlists = createSelector(
  selectWishlistsFeature,
  (wishlistsState: WishlistsState) => wishlistsState.wishlists
);
