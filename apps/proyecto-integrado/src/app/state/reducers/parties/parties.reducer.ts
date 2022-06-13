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
  on(PartiesActions.joinPartySuccess, (state, { user, partyId }) => ({
    ...state,
    loading: false,
    parties: state.parties.map((party) => {
      if (party.id === partyId) {
        return { ...party, users: [...party.users, user] };
      }
      return party;
    }),
  })),
  on(PartiesActions.joinPartyFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  }))
);
