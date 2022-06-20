import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/modules/users/domain/interfaces/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from '../dialog/users-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/interfaces/app.state.interface';
import { BackofficeActions } from '../../../../../state/actions/backoffice/backoffice.actions';
import { FormModes } from '../../../../../common/components/form/interfaces/form-modes.enum';

@Component({
  selector: 'proyecto-integrado-users-backoffice',
  templateUrl: './users-backoffice.component.html',
  styleUrls: ['./users-backoffice.component.scss'],
})
export class UsersBackofficeComponent {
  @Input() users!: Observable<User[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store$: Store<AppState>
  ) {}

  openAddDialog() {
    this.dialog.open(UsersDialogComponent, {
      data: {
        mode: FormModes.ADD,
      },
    });
  }

  openEditDialog(user: User) {
    this.dialog.open(UsersDialogComponent, {
      data: {
        mode: FormModes.EDIT,
        data: { user },
      },
    });
  }

  openViewDialog(user: User) {
    this.dialog.open(UsersDialogComponent, {
      data: {
        mode: FormModes.VIEW,
        data: { user },
      },
    });
  }

  delete(userId: string | number) {
    this.store$.dispatch(
      BackofficeActions.deleteUserRequest({ userId: userId as string })
    );
  }
}
