import { Injectable } from '@angular/core';
import { WishlistsService } from '../../../core/shared/modules/wishlists/services/wishlists.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces/app.state.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SnackbarService } from '../../../core/shared/services/snackbar.service';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { WishlistsActionTypes } from '../../actions/wishlists/wishlists-action.types.enum';
import { selectUser } from '../../selectors/auth/auth.selectors';
import { Wishlist } from '../../../core/shared/modules/wishlists/domain/interfaces/wishlist.interface';
import { User } from '../../../core/shared/modules/users/domain/interfaces/user.interface';

@Injectable()
export class WishlistsEffects {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly store$: Store<AppState>,
    private readonly actions$: Actions,
    private readonly snackbarService: SnackbarService
  ) {}

  findAllWishlistsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistsActionTypes.GET_WISHLISTS_REQUEST),
      switchMap(() =>
        this.wishlistsService.getWishlists().pipe(
          map((wishlists) => ({
            type: WishlistsActionTypes.GET_WISHLISTS_SUCCESS,
            wishlists,
          })),
          catchError((error) => {
            return of({
              type: WishlistsActionTypes.GET_WISHLISTS_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  findAllWishlistsFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WishlistsActionTypes.GET_WISHLISTS_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Error while retrieving wishlists',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  createWishlistRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WishlistsActionTypes.CREATE_WISHLIST_REQUEST),
      withLatestFrom(this.store$.select(selectUser)),
      switchMap(([{ wishlist }, user]: [{ wishlist: Wishlist }, User]) =>
        this.wishlistsService.createWishlist({ ...wishlist, user }).pipe(
          map((wishlist) => ({
            type: WishlistsActionTypes.CREATE_WISHLIST_SUCCESS,
            wishlist,
          })),
          catchError((error) => {
            return of({
              type: WishlistsActionTypes.CREATE_WISHLIST_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  createWishlistFailure = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WishlistsActionTypes.CREATE_WISHLIST_FAILURE),
        tap(() => {
          this.snackbarService.open(
            'Error while creating wishlist',
            'DISMISS',
            2000
          );
        })
      ),
    {
      dispatch: false,
    }
  );
}
