import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/interfaces/app.state.interface';
import { PartiesActions } from '../../../state/actions/parties/parties.actions';
import { firstValueFrom, map, Observable } from 'rxjs';
import { PartyOutput } from '../../shared/modules/parties/domain/parties.interface';

@Component({
  selector: 'proyecto-integrado-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss'],
})
export class PartiesComponent implements OnInit {
  allParties$!: Observable<PartyOutput[]>;
  myParties$!: Observable<PartyOutput[]>;
  constructor(private readonly store$: Store<AppState>) {
    this.store$.dispatch(PartiesActions.getPartiesRequest());
  }

  async ngOnInit(): Promise<void> {
    const userId = await firstValueFrom(
      this.store$.select((state) => state.auth.user?.id)
    );

    this.myParties$ = this.store$
      .select((state) => state.parties.parties)
      .pipe(
        map((parties) =>
          parties.filter((party) =>
            party.users.some((user) => user.id === userId)
          )
        )
      );

    this.allParties$ = this.store$
      .select((state) => state.parties.parties)
      .pipe(
        map((parties) =>
          parties.filter((party) => {
            if (!party.users.length) {
              return true;
            }
            return party.users.some((user) => user.id !== userId);
          })
        )
      );
    // this.parties$ = this.store$.select((state) => state.parties.parties);
  }
}
