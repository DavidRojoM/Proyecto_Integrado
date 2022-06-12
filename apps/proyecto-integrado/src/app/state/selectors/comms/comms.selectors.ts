import { AppState } from '../../interfaces/app.state.interface';
import { createSelector } from '@ngrx/store';
import { MessagesState } from '../../interfaces/messages.state.interface';

const selectMessagesFeature = (state: AppState) => state.messages;

export const selectPartyMessages = (partyId: string) =>
  createSelector(
    selectMessagesFeature,
    (messagesState: MessagesState) => messagesState.messages[partyId] || []
  );
