import { AppState } from '../../interfaces/app.state.interface';
import { createSelector } from '@ngrx/store';
import { PartiesState } from '../../interfaces/parties.state.interface';

const selectPartiesFeature = (state: AppState) => state.parties;

export const selectParties = createSelector(
  selectPartiesFeature,
  (partiesState: PartiesState) => partiesState.parties
);
