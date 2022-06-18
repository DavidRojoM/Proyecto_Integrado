import { ErrorPayload, Result, Wishlist } from '@proyecto-integrado/shared';

export type AddWishlistResponse = Result<Wishlist, ErrorPayload>;
export type InsertWishlist = Result<Wishlist, ErrorPayload>;

export type FindAllWishlists = Result<Wishlist[], ErrorPayload>;
