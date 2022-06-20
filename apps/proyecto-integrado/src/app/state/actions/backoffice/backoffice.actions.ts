import { createAction, props } from '@ngrx/store';
import { BackOfficeActionTypes } from './back-office-action.types.enum';
import { User } from '../../../core/shared/modules/users/domain/interfaces/user.interface';
import {
  PartyInput,
  PartyOutput,
} from '../../../core/shared/modules/parties/domain/parties.interface';
import {
  Destination,
  Hotel,
  Transport,
} from '../../../core/shared/modules/trips/domain/trips.interface';

export const BackofficeActions = {
  findUsersRequest: createAction(BackOfficeActionTypes.FIND_USERS_REQUEST),
  findUsersSuccess: createAction(
    BackOfficeActionTypes.FIND_USERS_SUCCESS,
    props<{ users: User[] }>()
  ),
  findUsersFailure: createAction(
    BackOfficeActionTypes.FIND_USERS_FAILURE,
    props<{ error: string }>()
  ),
  addUserRequest: createAction(
    BackOfficeActionTypes.ADD_USER_REQUEST,
    props<{ user: User }>()
  ),
  addUserSuccess: createAction(
    BackOfficeActionTypes.ADD_USER_SUCCESS,
    props<{ user: User }>()
  ),
  addUserFailure: createAction(
    BackOfficeActionTypes.ADD_USER_FAILURE,
    props<{ error: any }>()
  ),
  deleteUserRequest: createAction(
    BackOfficeActionTypes.DELETE_USER_REQUEST,
    props<{ userId: string }>()
  ),
  deleteUserSuccess: createAction(
    BackOfficeActionTypes.DELETE_USER_SUCCESS,
    props<{ userId: string }>()
  ),
  deleteUserFailure: createAction(
    BackOfficeActionTypes.DELETE_USER_FAILURE,
    props<{ error: any }>()
  ),
  editUserRequest: createAction(
    BackOfficeActionTypes.EDIT_USER_REQUEST,
    props<{ user: User }>()
  ),
  editUserSuccess: createAction(
    BackOfficeActionTypes.EDIT_USER_SUCCESS,
    props<{ user: User }>()
  ),
  editUserFailure: createAction(
    BackOfficeActionTypes.EDIT_USER_FAILURE,
    props<{ error: any }>()
  ),
  addPartyRequest: createAction(
    BackOfficeActionTypes.ADD_PARTY_REQUEST,
    props<{ name: string }>()
  ),
  addPartySuccess: createAction(
    BackOfficeActionTypes.ADD_PARTY_SUCCESS,
    props<{ party: PartyInput }>()
  ),
  addPartyFailure: createAction(
    BackOfficeActionTypes.ADD_PARTY_FAILURE,
    props<{ error: any }>()
  ),
  deletePartyRequest: createAction(
    BackOfficeActionTypes.DELETE_PARTY_REQUEST,
    props<{ partyId: string }>()
  ),
  deletePartySuccess: createAction(
    BackOfficeActionTypes.DELETE_PARTY_SUCCESS,
    props<{ partyId: string }>()
  ),
  deletePartyFailure: createAction(
    BackOfficeActionTypes.DELETE_PARTY_FAILURE,
    props<{ error: any }>()
  ),
  editPartyRequest: createAction(
    BackOfficeActionTypes.EDIT_PARTY_REQUEST,
    props<{ party: PartyOutput }>()
  ),
  editPartySuccess: createAction(
    BackOfficeActionTypes.EDIT_PARTY_SUCCESS,
    props<{ party: PartyOutput }>()
  ),
  editPartyFailure: createAction(
    BackOfficeActionTypes.EDIT_PARTY_FAILURE,
    props<{ error: any }>()
  ),
  addTransportRequest: createAction(
    BackOfficeActionTypes.ADD_TRANSPORT_REQUEST,
    props<{ transport: Transport }>()
  ),
  addTransportSuccess: createAction(
    BackOfficeActionTypes.ADD_TRANSPORT_SUCCESS,
    props<{ transport: Transport }>()
  ),
  addTransportFailure: createAction(
    BackOfficeActionTypes.ADD_TRANSPORT_FAILURE,
    props<{ error: any }>()
  ),
  deleteTransportRequest: createAction(
    BackOfficeActionTypes.DELETE_TRANSPORT_REQUEST,
    props<{ transportId: number }>()
  ),
  deleteTransportSuccess: createAction(
    BackOfficeActionTypes.DELETE_TRANSPORT_SUCCESS,
    props<{ transportId: number }>()
  ),
  deleteTransportFailure: createAction(
    BackOfficeActionTypes.DELETE_TRANSPORT_FAILURE,
    props<{ error: any }>()
  ),
  editTransportRequest: createAction(
    BackOfficeActionTypes.EDIT_TRANSPORT_REQUEST,
    props<{ transport: Transport }>()
  ),
  editTransportSuccess: createAction(
    BackOfficeActionTypes.EDIT_TRANSPORT_SUCCESS,
    props<{ transport: Transport }>()
  ),
  editTransportFailure: createAction(
    BackOfficeActionTypes.EDIT_TRANSPORT_FAILURE,
    props<{ error: any }>()
  ),
  addHotelRequest: createAction(
    BackOfficeActionTypes.ADD_HOTEL_REQUEST,
    props<{ hotel: Hotel }>()
  ),
  addHotelSuccess: createAction(
    BackOfficeActionTypes.ADD_HOTEL_SUCCESS,
    props<{ hotel: Hotel }>()
  ),
  addHotelFailure: createAction(
    BackOfficeActionTypes.ADD_HOTEL_FAILURE,
    props<{ error: any }>()
  ),
  deleteHotelRequest: createAction(
    BackOfficeActionTypes.DELETE_HOTEL_REQUEST,
    props<{ hotelId: number }>()
  ),
  deleteHotelSuccess: createAction(
    BackOfficeActionTypes.DELETE_HOTEL_SUCCESS,
    props<{ hotelId: number }>()
  ),
  deleteHotelFailure: createAction(
    BackOfficeActionTypes.DELETE_HOTEL_FAILURE,
    props<{ error: any }>()
  ),
  editHotelRequest: createAction(
    BackOfficeActionTypes.EDIT_HOTEL_REQUEST,
    props<{ hotel: Hotel }>()
  ),
  editHotelSuccess: createAction(
    BackOfficeActionTypes.EDIT_HOTEL_SUCCESS,
    props<{ hotel: Hotel }>()
  ),
  editHotelFailure: createAction(
    BackOfficeActionTypes.EDIT_HOTEL_FAILURE,
    props<{ error: any }>()
  ),
  addDestinationRequest: createAction(
    BackOfficeActionTypes.ADD_DESTINATION_REQUEST,
    props<{ destination: Destination }>()
  ),
  addDestinationSuccess: createAction(
    BackOfficeActionTypes.ADD_DESTINATION_SUCCESS,
    props<{ destination: Destination }>()
  ),
  addDestinationFailure: createAction(
    BackOfficeActionTypes.ADD_DESTINATION_FAILURE,
    props<{ error: any }>()
  ),
  deleteDestinationRequest: createAction(
    BackOfficeActionTypes.DELETE_DESTINATION_REQUEST,
    props<{ destinationId: number }>()
  ),
  deleteDestinationSuccess: createAction(
    BackOfficeActionTypes.DELETE_DESTINATION_SUCCESS,
    props<{ destinationId: number }>()
  ),
  deleteDestinationFailure: createAction(
    BackOfficeActionTypes.DELETE_DESTINATION_FAILURE,
    props<{ error: any }>()
  ),
  editDestinationRequest: createAction(
    BackOfficeActionTypes.EDIT_DESTINATION_REQUEST,
    props<{ destination: Destination }>()
  ),
  editDestinationSuccess: createAction(
    BackOfficeActionTypes.EDIT_DESTINATION_SUCCESS,
    props<{ destination: Destination }>()
  ),
  editDestinationFailure: createAction(
    BackOfficeActionTypes.EDIT_DESTINATION_FAILURE,
    props<{ error: any }>()
  ),
};
