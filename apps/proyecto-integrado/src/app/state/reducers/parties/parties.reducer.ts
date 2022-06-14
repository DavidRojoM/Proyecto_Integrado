import { PartiesState } from '../../interfaces/parties.state.interface';
import { createReducer, on } from '@ngrx/store';
import { PartiesActions } from '../../actions/parties/parties.actions';

const initialState: PartiesState = {
  loading: false,
  parties: [],
};

export const partiesReducer = createReducer(
  initialState,
  on(PartiesActions.getPartiesRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(PartiesActions.getPartiesSuccess, (state, { parties }) => ({
    ...state,
    loading: false,
    parties,
  })),
  on(PartiesActions.getPartiesFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(PartiesActions.joinPartyRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(PartiesActions.joinPartySuccess, (state, { user, party }) => ({
    ...state,
    loading: false,
    parties: state.parties.map((party2) => {
      console.log('USER', user);
      if (party2.id !== party.id) {
        return party2;
      }
      return { ...party2, users: [...party2.users, user] };
    }),
  })),
  on(PartiesActions.joinPartyFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(PartiesActions.leavePartyRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(PartiesActions.leavePartySuccess, (state, { userId, partyId }) => ({
    ...state,
    loading: false,
    parties: state.parties.map((party) => {
      if (party.id === partyId) {
        return {
          ...party,
          users: party.users.filter((user) => user.id !== userId),
        };
      }
      return party;
    }),
  })),
  on(PartiesActions.leavePartyFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  }))
);
