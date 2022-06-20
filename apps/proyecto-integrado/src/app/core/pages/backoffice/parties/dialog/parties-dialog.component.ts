import { Component, Inject } from '@angular/core';
import { FormOptions } from '../../../../../common/components/form/interfaces/form-options.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/interfaces/app.state.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormModes } from '../../../../../common/components/form/interfaces/form-modes.enum';
import { BackofficeActions } from '../../../../../state/actions/backoffice/backoffice.actions';
import { PartyOutput } from '../../../../shared/modules/parties/domain/parties.interface';

@Component({
  selector: 'proyecto-integrado-dialog-parties',
  templateUrl: './parties-dialog.component.html',
  styleUrls: ['./parties-dialog.component.scss'],
})
export class PartiesDialogComponent {
  formOptions: FormOptions = {
    data: { ...this.data?.data },
    mode: this.data.mode,
  };

  constructor(
    private readonly store$: Store<AppState>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      data?: {
        [key: string]: any;
      };
      mode: FormModes;
    }
  ) {}

  handle(data: { name: string } | PartyOutput) {
    if (this.data.mode === FormModes.ADD) {
      this.store$.dispatch(
        BackofficeActions.addPartyRequest({
          name: (data as { name: string }).name,
        })
      );
    }
    if (this.data.mode === FormModes.EDIT) {
      this.store$.dispatch(
        BackofficeActions.editPartyRequest({ party: data as PartyOutput })
      );
    }
  }
}
