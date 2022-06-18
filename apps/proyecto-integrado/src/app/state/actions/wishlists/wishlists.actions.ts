import { createAction, props } from '@ngrx/store';
import { WishlistsActionTypes } from './wishlists-action.types.enum';
import { Wishlist } from '../../../core/shared/modules/wishlists/domain/interfaces/wishlist.interface';

export const WishlistsActions = {
  getAllWishlistsRequest: createAction(
    WishlistsActionTypes.GET_WISHLISTS_REQUEST
  ),
  getAllWishlistsSuccess: createAction(
    WishlistsActionTypes.GET_WISHLISTS_SUCCESS,
    props<{ wishlists: Wishlist[] }>()
  ),
  getAllWishlistsFailure: createAction(
    WishlistsActionTypes.GET_WISHLISTS_FAILURE,
    props<{ error: string }>()
  ),
  createWishlistRequest: createAction(
    WishlistsActionTypes.CREATE_WISHLIST_REQUEST,
    props<{ wishlist: Partial<Wishlist> }>()
  ),
  createWishlistSuccess: createAction(
    WishlistsActionTypes.CREATE_WISHLIST_SUCCESS,
    props<{ wishlist: Wishlist }>()
  ),
  createWishlistFailure: createAction(
    WishlistsActionTypes.CREATE_WISHLIST_FAILURE,
    props<{ error: string }>()
  ),
};
