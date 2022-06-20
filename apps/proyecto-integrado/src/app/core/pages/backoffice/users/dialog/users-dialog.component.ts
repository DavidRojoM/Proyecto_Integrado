import { Component, Inject } from '@angular/core';
import { FormOptions } from '../../../../../common/components/form/interfaces/form-options.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/interfaces/app.state.interface';
import { User } from '../../../../shared/modules/users/domain/interfaces/user.interface';
import { BackofficeActions } from '../../../../../state/actions/backoffice/backoffice.actions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormModes } from '../../../../../common/components/form/interfaces/form-modes.enum';

@Component({
  selector: 'proyecto-integrado-dialog-users',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss'],
})
export class UsersDialogComponent {
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

  handle(user: User) {
    if (this.data.mode === FormModes.ADD) {
      this.store$.dispatch(BackofficeActions.addUserRequest({ user }));
    }
    if (this.data.mode === FormModes.EDIT) {
      this.store$.dispatch(BackofficeActions.editUserRequest({ user }));
    }
  }
}
