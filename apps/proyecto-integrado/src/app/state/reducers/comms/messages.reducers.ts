import { MessagesState } from '../../interfaces/messages.state.interface';
import { createReducer, on } from '@ngrx/store';
import { CommsActions } from '../../actions/comms/comms.actions';

const initialState: MessagesState = {
  messages: {},
  loading: false,
};
export const messagesReducer = createReducer(
  initialState,
  on(CommsActions.loadMessagesRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(CommsActions.loadMessagesSuccess, (state, { partyId, messages }) => ({
    ...state,
    messages: {
      ...state.messages,
      [partyId]: [...messages],
    },
    loading: false,
  })),
  on(CommsActions.loadMessagesFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(CommsActions.loadMessageSuccess, (state, { message }) => ({
    ...state,
    messages: {
      ...state.messages,
      [message.partyId]: [...(state.messages[message.partyId] || []), message],
    },
  })),
  on(CommsActions.sendMessageRequest, (state) => ({
    ...state,
    loading: true,
  }))
);
