import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../state/interfaces/app.state.interface';
import {
  selectAllDestinations,
  selectAllTransports,
} from '../../../../../../state/selectors/trips/trips.selectors';
import { TripsActions } from '../../../../../../state/actions/trips/trips.actions';

@Component({
  selector: 'proyecto-integrado-trip-selector',
  templateUrl: './trip-selector.component.html',
  styleUrls: ['./trip-selector.component.scss'],
})
export class TripSelectorComponent implements OnInit {
  transports = this.store$.select(selectAllTransports);
  destinations = this.store$.select(selectAllDestinations);
  hotels = this.store$.select(selectAllDestinations);
  constructor(private readonly store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(TripsActions.getAllDestinationsRequest());
    this.store$.dispatch(TripsActions.getAllTransportsRequest());
    this.store$.dispatch(TripsActions.getAllHotelsRequest());
  }
}
