import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/interfaces/app.state.interface';
import { PartiesActions } from '../../../../state/actions/parties/parties.actions';
import { Observable, Subscription, take, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { selectPartyById } from '../../../../state/selectors/parties/parties.selectors';
import { PartyOutput } from '../../../shared/modules/parties/domain/parties.interface';
import { User } from '../../../shared/modules/users/domain/interfaces/user.interface';
import { selectUser } from '../../../../state/selectors/auth/auth.selectors';
import { ChatService } from '../../../shared/modules/comms/services/chat.service';
import { MessageOutput } from '../../../shared/modules/comms/domain/message.interface';

@Component({
  selector: 'proyecto-integrado-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss'],
})
export class PartyComponent implements OnInit, OnDestroy {
  partyId = this.route.snapshot.paramMap.get('id') as string;

  party$!: Observable<PartyOutput>;
  message$!: Observable<MessageOutput[]>;
  myStatus: string | undefined;
  me!: User;

  chatSubscription!: Subscription;

  userStatusMap: { [index: string]: string } = {
    PENDING: '⏳',
    READY: '✅',
    ORGANIZER: '📆',
  };

  constructor(
    private readonly store$: Store<AppState>,
    private readonly route: ActivatedRoute,
    private readonly chatService: ChatService
  ) {
    this.store$.dispatch(PartiesActions.getPartiesRequest());
  }

  ngOnInit(): void {
    this.initParty();
  }

  private initParty(): void {
    this.store$
      .select(selectUser)
      .pipe(take(1))
      .subscribe((user) => {
        this.me = user;
      });
    this.party$ = this.store$.select(selectPartyById(this.partyId));
    this.initChat(this.partyId);

    this.party$.subscribe((party) => {
      this.myStatus = party?.users.find((u) => u.id === this.me.id)?.status;
    });
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
    this.chatSubscription = this.chatService.messageAdded(partyId);
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
    this.chatSubscription.unsubscribe();
  }
  //TODO: IMPLEMENT
  leaveParty() {}

  joinParty() {
    this.store$.dispatch(
      PartiesActions.joinPartyRequest({
        partyId: this.partyId,
        userId: this.me.id,
      })
    );
  }

  organizeParty() {}

  selectTrip() {}

  checkout() {}

  cancelCheckout() {}
}
