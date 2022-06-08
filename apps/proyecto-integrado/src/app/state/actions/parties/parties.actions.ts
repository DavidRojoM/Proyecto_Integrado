import { PartiesActionTypes } from './parties-action.types.enum';
import { createAction, props } from '@ngrx/store';
import {
  PartyInput,
  PartyOutput,
} from '../../../core/shared/modules/parties/domain/parties.interface';

export const PartiesActions = {
  createPartyRequest: createAction(
    PartiesActionTypes.CREATE_PARTY_REQUEST,
    props<{ party: PartyInput }>()
  ),
  createPartySuccess: createAction(
    PartiesActionTypes.CREATE_PARTY_SUCCESS,
    props<{ party: PartyInput }>()
  ),
  createPartyFailure: createAction(
    PartiesActionTypes.CREATE_PARTY_FAILURE,
    props<{ error: string }>()
  ),
  getPartiesRequest: createAction(PartiesActionTypes.GET_PARTIES_REQUEST),
  getPartiesSuccess: createAction(
    PartiesActionTypes.GET_PARTIES_SUCCESS,
    props<{ parties: PartyOutput[] }>()
  ),
  getPartiesFailure: createAction(
    PartiesActionTypes.GET_PARTIES_FAILURE,
    props<{ error: string }>()
  ),
  deletePartyRequest: createAction(
    PartiesActionTypes.DELETE_PARTY_REQUEST,
    props<{ partyId: string }>()
  ),
  deletePartySuccess: createAction(
    PartiesActionTypes.DELETE_PARTY_SUCCESS,
    props<{ partyId: string }>()
  ),
  deletePartyFailure: createAction(
    PartiesActionTypes.DELETE_PARTY_FAILURE,
    props<{ error: string }>()
  ),
  updatePartyRequest: createAction(
    PartiesActionTypes.UPDATE_PARTY_REQUEST,
    props<{ party: PartyInput }>()
  ),
  updatePartySuccess: createAction(
    PartiesActionTypes.UPDATE_PARTY_SUCCESS,
    props<{ party: PartyInput }>()
  ),
  updatePartyFailure: createAction(
    PartiesActionTypes.UPDATE_PARTY_FAILURE,
    props<{ error: string }>()
  ),
  joinPartyRequest: createAction(
    PartiesActionTypes.JOIN_PARTY_REQUEST,
    props<{ userId: string; partyId: string }>()
  ),
  joinPartySuccess: createAction(
    PartiesActionTypes.JOIN_PARTY_SUCCESS
    //TODO
  ),
  joinPartyFailure: createAction(
    PartiesActionTypes.JOIN_PARTY_FAILURE,
    props<{ error: string }>()
  ),
  leavePartyRequest: createAction(
    PartiesActionTypes.LEAVE_PARTY_REQUEST,
    props<{ userId: string; partyId: string }>()
  ),
  leavePartySuccess: createAction(
    PartiesActionTypes.LEAVE_PARTY_SUCCESS
    //TODO
  ),
  leavePartyFailure: createAction(
    PartiesActionTypes.LEAVE_PARTY_FAILURE,
    props<{ error: string }>()
  ),
};