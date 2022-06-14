import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/interfaces/app.state.interface';
import { PartiesActions } from '../../../state/actions/parties/parties.actions';
import { forkJoin, map, Observable, Subscription, take } from 'rxjs';
import { PartyOutput } from '../../shared/modules/parties/domain/parties.interface';
import { selectParties } from '../../../state/selectors/parties/parties.selectors';
import { selectUser } from '../../../state/selectors/auth/auth.selectors';

@Component({
  selector: 'proyecto-integrado-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss'],
})
export class PartiesComponent implements OnInit, OnDestroy {
  allParties$!: Observable<PartyOutput[]>;
  myParties$!: Observable<PartyOutput[]>;

  subscriptions: Subscription[] = [];

  constructor(private readonly store$: Store<AppState>) {
    this.store$.dispatch(PartiesActions.getPartiesRequest());
  }

  async ngOnInit(): Promise<void> {
    const partiesSubscription = this.store$
      .select((state) => state.auth.user?.id)
      .subscribe((userId) => {
        forkJoin([
          (this.myParties$ = this.store$
            .select(selectParties)
            .pipe(
              map((parties) =>
                parties.filter((party) =>
                  party.users.some((user) => user.id === userId)
                )
              )
            )),
          (this.allParties$ = this.store$.select(selectParties).pipe(
            map((parties) =>
              parties.filter((party) => {
                if (!party.users.length) {
                  return true;
                }
                return !party.users.some((user) => user.id === userId);
              })
            )
          )),
        ]);
      });
    this.subscriptions = [...this.subscriptions, partiesSubscription];
  }

  leaveParty(partyId: string) {
    const leaveSubscription = this.store$
      .select(selectUser)
      .pipe(take(1))
      .subscribe((user) => {
        this.store$.dispatch(
          PartiesActions.leavePartyRequest({ partyId, userId: user.id })
        );
      });
    this.subscriptions = [...this.subscriptions, leaveSubscription];
  }

  joinParty(partyId: string) {
    const joinSubscription = this.store$
      .select(selectUser)
      .pipe(take(1))
      .subscribe((user) => {
        this.store$.dispatch(
          PartiesActions.joinPartyRequest({ partyId, userId: user.id })
        );
      });
    this.subscriptions = [...this.subscriptions, joinSubscription];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
