import { PartyOutput } from '../../core/shared/modules/parties/domain/parties.interface';

export interface PartiesState {
  parties: PartyOutput[];
  loading: boolean;
  error?: string;
}
