import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/interfaces/app.state.interface';
import { WishlistsActions } from '../../../state/actions/wishlists/wishlists.actions';
import { selectWishlists } from '../../../state/selectors/wishlists/wishlists.selectors';
import { AddWishlistDialogComponent } from './add-wishlist-dialog/add-wishlist-dialog.component';
import { selectUser } from '../../../state/selectors/auth/auth.selectors';
import { map } from 'rxjs';
import { PartiesActions } from '../../../state/actions/parties/parties.actions';

@Component({
  selector: 'proyecto-integrado-wishlists',
  templateUrl: './wishlists.component.html',
  styleUrls: ['./wishlists.component.scss'],
})
export class WishlistsComponent implements OnInit {
  wishlists$ = this.store$.select(selectWishlists);
  parties$ = this.store$
    .select(selectUser)
    .pipe(map((user) => user.parties || []));

  constructor(
    private readonly dialog: MatDialog,
    private readonly store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(WishlistsActions.getAllWishlistsRequest());
  }

  createWishlist(): void {
    this.dialog.open(AddWishlistDialogComponent);
  }

  addToParty(config: { userId: string; partyId: string }) {
    //TODO:CAMBIAR POR OTRA ACCION PARA NO GENERAR CONFLICTOS CON EL REDUCER
    this.store$.dispatch(PartiesActions.addToPartyRequest(config));
  }
}
