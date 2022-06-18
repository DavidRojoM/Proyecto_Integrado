import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/interfaces/app.state.interface';
import { selectAllDestinations } from '../../../../state/selectors/trips/trips.selectors';
import { TripsActions } from '../../../../state/actions/trips/trips.actions';
import { Wishlist } from '../../../shared/modules/wishlists/domain/interfaces/wishlist.interface';
import { WishlistsActions } from '../../../../state/actions/wishlists/wishlists.actions';

@Component({
  selector: 'proyecto-integrado-add-wishlist-dialog',
  templateUrl: './add-wishlist-dialog.component.html',
  styleUrls: ['./add-wishlist-dialog.component.scss'],
})
export class AddWishlistDialogComponent implements OnInit {
  form = this.fb.group({
    ageFilter: ['', [Validators.min(0)]],
    genderFilter: [''],
    departureFilter: [''],
    destination: ['', [Validators.required]],
  });
  destinations$ = this.store$.select(selectAllDestinations);
  constructor(
    private readonly fb: FormBuilder,
    private readonly store$: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(TripsActions.getAllDestinationsRequest());
  }

  createWishlist() {
    if (!this.form.valid) {
      return;
    }
    const wishlist: Partial<Wishlist> = {
      genderFilter: this.form.value.genderFilter,
      ageFilter: this.form.value.ageFilter,
      departureFilter: this.form.value.departureFilter,
      destination: this.form.value.destination,
    };

    this.store$.dispatch(WishlistsActions.createWishlistRequest({ wishlist }));
  }
}
