import { AppState } from '../../interfaces/app.state.interface';
import { createSelector } from '@ngrx/store';
import { PartiesState } from '../../interfaces/parties.state.interface';
import { PartyOutput } from '../../../core/shared/modules/parties/domain/parties.interface';

const selectPartiesFeature = (state: AppState) => state.parties;

export const selectParties = createSelector(
  selectPartiesFeature,
  (partiesState: PartiesState) => partiesState.parties
);

export const selectPartyById = (id: string) =>
  createSelector(
    selectPartiesFeature,
    (partiesState: PartiesState) =>
      partiesState.parties.find((party) => party.id === id) as PartyOutput
  );
