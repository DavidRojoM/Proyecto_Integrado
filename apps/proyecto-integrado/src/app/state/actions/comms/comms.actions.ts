import { createAction, props } from '@ngrx/store';
import { CommsActionTypes } from './comms-action.types.enum';
import {
  MessageInput,
  MessageOutput,
} from '../../../core/shared/modules/comms/domain/message.interface';

export const CommsActions = {
  sendMessageRequest: createAction(
    CommsActionTypes.SEND_MESSAGE_REQUEST,
    props<{ message: MessageInput }>()
  ),

  loadMessagesRequest: createAction(
    CommsActionTypes.LOAD_MESSAGES_REQUEST,
    props<{ partyId: string }>()
  ),
  loadMessagesSuccess: createAction(
    CommsActionTypes.LOAD_MESSAGES_SUCCESS,
    props<{ partyId: string; messages: MessageOutput[] }>()
  ),
  loadMessagesFailure: createAction(
    CommsActionTypes.LOAD_MESSAGES_FAILURE,
    props<{ error: string }>()
  ),

  loadMessageSuccess: createAction(
    CommsActionTypes.LOAD_MESSAGE_SUCCESS,
    props<{ partyId: string; message: MessageOutput }>()
  ),
};
