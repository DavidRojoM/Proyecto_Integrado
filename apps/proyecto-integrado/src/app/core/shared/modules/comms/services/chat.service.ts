import { Injectable } from '@angular/core';
import { ChatGqlRepository } from './gql-repository/chat-gql.repository';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/interfaces/app.state.interface';
import { CommsActions } from '../../../../../state/actions/comms/comms.actions';
import { MessageInput, MessageOutput } from '../domain/message.interface';
import { selectPartyMessages } from '../../../../../state/selectors/comms/comms.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private readonly chatRepository: ChatGqlRepository,
    private readonly store$: Store<AppState>
  ) {}

  public loadMessages(partyId: string) {
    this.store$.dispatch(CommsActions.loadMessagesRequest({ partyId }));
  }

  public findAll(partyId: string): Observable<MessageOutput[]> {
    return this.store$.select(selectPartyMessages(partyId));
  }

  public createOne(message: MessageInput) {
    this.store$.dispatch(CommsActions.sendMessageRequest({ message }));
  }

  public messageAdded(partyId: string) {
    return this.chatRepository.messageAdded(partyId).subscribe((message) => {
      this.store$.dispatch(
        CommsActions.loadMessageSuccess({ partyId, message })
      );
      //TODO: REFACTOR
      setTimeout(() => {
        this.scrollToBottom();
      }, 1);
    });
  }

  public scrollToBottom() {
    //Extract this
    const messageSection = document.querySelector(
      '.message-section'
    ) as HTMLDivElement;
    messageSection.scrollTo(0, messageSection.scrollHeight + 10);
  }
}
