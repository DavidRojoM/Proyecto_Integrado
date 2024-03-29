import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/interfaces/app.state.interface';
import { PartiesActions } from '../../../state/actions/parties/parties.actions';
import { forkJoin, map, Observable, Subscription } from 'rxjs';
import { PartyOutput } from '../../shared/modules/parties/domain/parties.interface';
import { selectParties } from '../../../state/selectors/parties/parties.selectors';
import { selectUser } from '../../../state/selectors/auth/auth.selectors';
import { MatDialog } from '@angular/material/dialog';
import { AddPartyDialogComponent } from './add-party-dialog/add-party-dialog.component';

@Component({
  selector: 'proyecto-integrado-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss'],
})
export class PartiesComponent implements OnInit, OnDestroy {
  allParties$!: Observable<PartyOutput[]>;
  myParties$!: Observable<PartyOutput[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private readonly store$: Store<AppState>,
    private readonly dialog: MatDialog
  ) {
    this.store$.dispatch(PartiesActions.getPartiesRequest());
  }

  async ngOnInit(): Promise<void> {
    const partiesSubscription = this.store$
      .select(selectUser)
      .subscribe((user) => {
        const userId = user?.id;
        if (!userId) {
          return;
        }
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
                if (party.status === 'READY') {
                  return false;
                }
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
    this.store$.dispatch(PartiesActions.leavePartyRequest({ partyId }));
  }

  joinParty(partyId: string) {
    this.store$.dispatch(PartiesActions.joinPartyRequest({ partyId }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  createParty() {
    this.dialog.open(AddPartyDialogComponent, {});
  }
}
