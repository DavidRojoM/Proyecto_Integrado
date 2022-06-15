import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/interfaces/app.state.interface';
import { PartiesActions } from '../../../../state/actions/parties/parties.actions';
import { Observable, Subscription, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { selectPartyById } from '../../../../state/selectors/parties/parties.selectors';
import { User } from '../../../shared/modules/users/domain/interfaces/user.interface';
import { selectUser } from '../../../../state/selectors/auth/auth.selectors';
import { ChatService } from '../../../shared/modules/comms/services/chat.service';
import { MessageOutput } from '../../../shared/modules/comms/domain/message.interface';
import { MatDialog } from '@angular/material/dialog';
import { TripSelectorComponent } from './trip-dialog/trip-selector/trip-selector.component';

@Component({
  selector: 'proyecto-integrado-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss'],
})
export class PartyComponent implements OnInit, OnDestroy {
  partyId = this.route.snapshot.paramMap.get('id') as string;
  party$ = this.store$.select(selectPartyById(this.partyId));
  message$!: Observable<MessageOutput[]>;
  myStatus: string | undefined;
  partyStatus = false;
  me!: User;
  price!: Observable<number>;

  subscriptions: Subscription[] = [];

  userStatusMap: { [index: string]: string } = {
    PENDING: '⏳',
    READY: '✅',
    ORGANIZER: '📆',
  };

  constructor(
    private readonly store$: Store<AppState>,
    private readonly route: ActivatedRoute,
    private readonly chatService: ChatService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {
    this.store$.dispatch(PartiesActions.getPartiesRequest());
  }

  ngOnInit(): void {
    this.initParty();
  }

  private initParty(): void {
    //TODO: SHOW PRICE
    this.initChat(this.partyId);

    const meSubscription = this.store$.select(selectUser).subscribe((user) => {
      this.me = user;
    });

    const statusSubscription = this.party$.subscribe((party) => {
      this.myStatus = party?.users.find(
        (user) => user.id === this.me?.id
      )?.status;
      this.partyStatus =
        !!party.users.length &&
        !party?.users.some((user) => user.status === 'PENDING');
    });

    this.subscriptions = [
      ...this.subscriptions,
      meSubscription,
      statusSubscription,
    ];
  }

  private initChat(partyId: string) {
    this.chatService.loadMessages(partyId);
    this.message$ = this.chatService.findAll(partyId).pipe(
      tap(() => {
        setTimeout(() => {
          this.chatService.scrollToBottom();
        }, 1);
      })
    );
    this.subscriptions = [
      ...this.subscriptions,
      this.chatService.messageAdded(partyId),
    ];
  }

  sendMessage(message: string) {
    const msg = {
      message,
      partyId: this.partyId,
      userId: this.me.id,
    };
    this.chatService.createOne(msg);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
  leaveParty() {
    this.store$.dispatch(
      PartiesActions.leavePartyRequest({
        partyId: this.partyId,
        userId: this.me.id,
      })
    );
    this.router.navigate(['/parties']);
  }

  joinParty() {
    this.store$.dispatch(
      PartiesActions.joinPartyRequest({
        partyId: this.partyId,
        userId: this.me.id,
      })
    );
  }

  organizeParty() {
    this.store$.dispatch(
      PartiesActions.becomeOrganizerRequest({
        partyId: this.partyId,
        userId: this.me.id,
      })
    );
  }

  selectTrip() {
    this.dialog.open(TripSelectorComponent);
  }

  checkout() {
    console.log('TODO PartyComponent#checkout');
  }

  cancelCheckout() {
    console.log('TODO PartyComponent#cancelCheckout');
  }

  confirmParty() {
    console.log('TODO PartyComponent#confirmParty');
  }
}
