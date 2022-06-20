import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/interfaces/app.state.interface';
import {
  selectAllDestinations,
  selectAllHotels,
  selectAllTransports,
} from '../../../state/selectors/trips/trips.selectors';
import { TripsActions } from '../../../state/actions/trips/trips.actions';
import { selectParties } from '../../../state/selectors/parties/parties.selectors';
import { PartiesActions } from '../../../state/actions/parties/parties.actions';
import { BackofficeActions } from '../../../state/actions/backoffice/backoffice.actions';
import { selectUsers } from '../../../state/selectors/backoffice/backoffice-users.selectors';

@Component({
  selector: 'proyecto-integrado-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.scss'],
})
export class BackofficeComponent implements OnInit {
  users$ = this.store$.select(selectUsers);
  parties$ = this.store$.select(selectParties);
  hotels$ = this.store$.select(selectAllHotels);
  destinations$ = this.store$.select(selectAllDestinations);
  transports$ = this.store$.select(selectAllTransports);

  constructor(private readonly store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(TripsActions.getAllHotelsRequest());
    this.store$.dispatch(TripsActions.getAllDestinationsRequest());
    this.store$.dispatch(TripsActions.getAllTransportsRequest());
    this.store$.dispatch(PartiesActions.getPartiesRequest());
    this.store$.dispatch(BackofficeActions.findUsersRequest());
  }
}
