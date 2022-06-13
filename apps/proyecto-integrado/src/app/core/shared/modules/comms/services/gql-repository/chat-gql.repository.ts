import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { findAllByPartyId } from './queries/find-all-by-party.id';
import { map, timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { sendMessageMutation } from './mutations/send-message.mutation';
import { MessageAddedSubscription } from './subscriptions/message-added.subscription';
import { MessageInput, MessageOutput } from '../../domain/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatGqlRepository {
  constructor(private readonly apollo: Apollo) {}

  public findAll(partyId: string): Observable<MessageOutput[]> {
    return this.apollo
      .query({
        variables: {
          partyId,
        },
        query: findAllByPartyId,
        fetchPolicy: 'no-cache',
      })
      .pipe(map(({ data }: any) => data.findAllByPartyId));
  }

  public addOne(message: MessageInput) {
    return this.apollo
      .mutate({
        mutation: sendMessageMutation,
        variables: {
          messageInput: { ...message },
        },
      })
      .pipe(map(({ data }: any) => data.sendMessage));
  }

  public messageAdded(partyId: string) {
    return this.apollo
      .subscribe({
        query: MessageAddedSubscription,
        variables: {
          partyId,
        },
      })
      .pipe(map(({ data }: any) => data.messageAdded));
  }
}
