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
  on(PartiesActions.createPartyRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(PartiesActions.createPartySuccess, (state, { party }) => ({
    ...state,
    loading: false,
    parties: [
      {
        id: party.id,
        users: [],
        name: party.name,
      },
      ...state.parties,
    ],
  })),
  on(PartiesActions.createPartyFailure, (state, { error }: any) => ({
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
      if (party2.id !== party.id) {
        return party2;
      }
      return {
        ...party2,
        users: [...party2.users, { ...user, status: party.status }],
      };
    }),
  })),
  on(PartiesActions.joinPartyFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(PartiesActions.addToPartyRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(PartiesActions.addToPartySuccess, (state, { party, user }) => ({
    ...state,
    loading: false,
    parties: state.parties.map((p) => {
      if (p.id !== party.id) {
        return p;
      }
      return {
        ...p,
        users: [...p.users, user],
      };
    }),
  })),
  on(PartiesActions.addToPartyFailure, (state, { error }: any) => ({
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
  })),
  on(PartiesActions.becomeOrganizerRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(PartiesActions.becomeOrganizerSuccess, (state, { user, party }) => ({
    ...state,
    loading: false,
    parties: state.parties.map((party2) => {
      if (party2.id !== party.id) {
        return party2;
      }
      return {
        ...party2,
        users: [...party2.users, { ...user, status: party.status }],
      };
    }),
  })),
  on(PartiesActions.becomeOrganizerFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  })),
  on(PartiesActions.addTripSuccess, (state, { partyId, trip }) => ({
    ...state,
    parties: state.parties.map((party) => {
      if (party.id !== partyId) {
        return party;
      }
      return {
        ...party,
        trip,
      };
    }),
  })),
  on(PartiesActions.checkoutRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(PartiesActions.checkoutSuccess, (state, { partyId, userId }) => ({
    ...state,
    loading: false,
    parties: state.parties.map((party) => {
      if (party.id !== partyId) {
        return party;
      }
      return {
        ...party,
        users: party.users.map((user) => {
          if (user.id !== userId) {
            return user;
          }
          return {
            ...user,
            status: 'READY',
          };
        }),
      };
    }),
  })),
  on(PartiesActions.cancelCheckoutRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(PartiesActions.cancelCheckoutSuccess, (state, { partyId, userId }) => ({
    ...state,
    loading: false,
    parties: state.parties.map((party) => {
      if (party.id !== partyId) {
        return party;
      }
      return {
        ...party,
        users: party.users.map((user) => {
          if (user.id !== userId) {
            return user;
          }
          return {
            ...user,
            status: 'PENDING',
          };
        }),
      };
    }),
  })),
  on(PartiesActions.confirmPartyRequest, (state) => ({
    ...state,
    loading: true,
  })),
  on(PartiesActions.confirmPartySuccess, (state, { partyId, userId }) => ({
    ...state,
    loading: false,
    parties: state.parties.map((party) => {
      if (party.id !== partyId) {
        return party;
      }
      return {
        ...party,
        status: 'READY',
      };
    }),
  })),
  on(PartiesActions.confirmPartyFailure, (state, { error }: any) => ({
    ...state,
    loading: false,
    error: error.error.statusText,
  }))
);
