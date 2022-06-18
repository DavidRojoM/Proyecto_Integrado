import { WishlistsState } from '../../interfaces/wishlists.state.interface';
import { createReducer, on } from '@ngrx/store';
import { WishlistsActions } from '../../actions/wishlists/wishlists.actions';

const initialState: WishlistsState = {
  wishlists: [],
};

export const wishlistsReducer = createReducer(
  initialState,
  on(WishlistsActions.getAllWishlistsRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(WishlistsActions.getAllWishlistsSuccess, (state, { wishlists }) => ({
    ...state,
    loading: false,
    wishlists,
  })),
  on(WishlistsActions.getAllWishlistsFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(WishlistsActions.createWishlistRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(WishlistsActions.createWishlistSuccess, (state, { wishlist }) => ({
    ...state,
    loading: false,
    wishlists: [wishlist, ...state.wishlists],
  })),
  on(WishlistsActions.createWishlistFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  }))
);
