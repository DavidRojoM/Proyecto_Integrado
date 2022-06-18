import { PartiesActionTypes } from './parties-action.types.enum';
import { createAction, props } from '@ngrx/store';
import {
  PartyInput,
  PartyOutput,
} from '../../../core/shared/modules/parties/domain/parties.interface';
import { User } from '../../../core/shared/modules/users/domain/interfaces/user.interface';
import { Trip } from '../../../core/shared/modules/trips/domain/trips.interface';

export const PartiesActions = {
  createPartyRequest: createAction(
    PartiesActionTypes.CREATE_PARTY_REQUEST,
    props<{ name: string }>()
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
    PartiesActionTypes.JOIN_PARTY_SUCCESS,
    props<{ user: User; party: PartyOutput }>()
  ),
  joinPartyFailure: createAction(
    PartiesActionTypes.JOIN_PARTY_FAILURE,
    props<{ error: string }>()
  ),
  addToPartyRequest: createAction(
    PartiesActionTypes.ADD_TO_PARTY_REQUEST,
    props<{ userId: string; partyId: string }>()
  ),
  addToPartySuccess: createAction(
    PartiesActionTypes.ADD_TO_PARTY_SUCCESS,
    props<{ user: User; party: PartyOutput }>()
  ),
  addToPartyFailure: createAction(
    PartiesActionTypes.ADD_TO_PARTY_FAILURE,
    props<{ error: string }>()
  ),
  leavePartyRequest: createAction(
    PartiesActionTypes.LEAVE_PARTY_REQUEST,
    props<{ userId: string; partyId: string }>()
  ),
  leavePartySuccess: createAction(
    PartiesActionTypes.LEAVE_PARTY_SUCCESS,
    props<{ userId: string; partyId: string }>()
  ),
  leavePartyFailure: createAction(
    PartiesActionTypes.LEAVE_PARTY_FAILURE,
    props<{ error: string }>()
  ),
  becomeOrganizerRequest: createAction(
    PartiesActionTypes.BECOME_ORGANIZER_REQUEST,
    props<{ userId: string; partyId: string }>()
  ),
  becomeOrganizerSuccess: createAction(
    PartiesActionTypes.BECOME_ORGANIZER_SUCCESS,
    props<{ user: User; party: PartyOutput }>()
  ),
  becomeOrganizerFailure: createAction(
    PartiesActionTypes.BECOME_ORGANIZER_FAILURE,
    props<{ error: string }>()
  ),
  addTripRequest: createAction(
    PartiesActionTypes.ADD_TRIP_REQUEST,
    props<{ partyId: string; trip: Trip }>()
  ),
  addTripSuccess: createAction(
    PartiesActionTypes.ADD_TRIP_SUCCESS,
    props<{ partyId: string; trip: Trip }>()
  ),
  checkoutRequest: createAction(
    PartiesActionTypes.CHECKOUT_PARTY_REQUEST,
    props<{ partyId: string }>()
  ),
  checkoutSuccess: createAction(
    PartiesActionTypes.CHECKOUT_PARTY_SUCCESS,
    props<{ partyId: string; userId: string }>()
  ),
  checkoutFailure: createAction(
    PartiesActionTypes.CHECKOUT_PARTY_FAILURE,
    props<{ error: string }>()
  ),
  cancelCheckoutRequest: createAction(
    PartiesActionTypes.CANCEL_CHECKOUT_PARTY_REQUEST,
    props<{ partyId: string }>()
  ),
  cancelCheckoutSuccess: createAction(
    PartiesActionTypes.CANCEL_CHECKOUT_PARTY_SUCCESS,
    props<{ partyId: string }>()
  ),
  cancelCheckoutFailure: createAction(
    PartiesActionTypes.CANCEL_CHECKOUT_PARTY_FAILURE,
    props<{ error: string }>()
  ),
};
