import { Component, Inject } from '@angular/core';
import { FormOptions } from '../../../../../common/components/form/interfaces/form-options.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/interfaces/app.state.interface';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormModes } from '../../../../../common/components/form/interfaces/form-modes.enum';
import { BackofficeActions } from '../../../../../state/actions/backoffice/backoffice.actions';
import { Hotel } from '../../../../shared/modules/trips/domain/trips.interface';

@Component({
  selector: 'proyecto-integrado-dialog-destinations',
  templateUrl: './hotels-dialog.component.html',
  styleUrls: ['./hotels-dialog.component.scss'],
})
export class HotelsDialogComponent {
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

  handle(hotel: Hotel) {
    if (this.data.mode === FormModes.ADD) {
      this.store$.dispatch(BackofficeActions.addHotelRequest({ hotel }));
    }
    if (this.data.mode === FormModes.EDIT) {
      this.store$.dispatch(BackofficeActions.editHotelRequest({ hotel }));
    }
  }
}
