import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/interfaces/app.state.interface';
import { PartiesActions } from '../../../state/actions/parties/parties.actions';

@Component({
  selector: 'proyecto-integrado-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss'],
})
export class PartyComponent implements OnInit {
  constructor(private readonly store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(PartiesActions.getPartiesRequest());
  }
}
