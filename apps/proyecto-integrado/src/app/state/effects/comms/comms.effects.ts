import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CommsActionTypes } from '../../actions/comms/comms-action.types.enum';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { ChatGqlRepository } from '../../../core/shared/modules/comms/services/gql-repository/chat-gql.repository';
import { Injectable } from '@angular/core';

@Injectable()
export class CommsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly chatService: ChatGqlRepository
  ) {}

  //TODO: FIX MESSAGES FETCHING
  loadMessagesRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommsActionTypes.LOAD_MESSAGES_REQUEST),
      switchMap(({ partyId }) =>
        this.chatService.findAll(partyId).pipe(
          map((messages) => ({
            type: CommsActionTypes.LOAD_MESSAGES_SUCCESS,
            partyId,
            messages,
          })),
          catchError((error) => {
            return of({
              type: CommsActionTypes.LOAD_MESSAGES_FAILURE,
              error,
            });
          })
        )
      )
    )
  );

  sendMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CommsActionTypes.SEND_MESSAGE_REQUEST),
        exhaustMap(({ message }) => this.chatService.addOne(message))
      ),
    {
      dispatch: false,
    }
  );
}
