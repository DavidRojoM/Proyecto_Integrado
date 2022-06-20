import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Transport } from '../../../../shared/modules/trips/domain/trips.interface';
import { MatDialog } from '@angular/material/dialog';
import { TransportsDialogComponent } from '../dialog/transports-dialog.component';
import { FormModes } from '../../../../../common/components/form/interfaces/form-modes.enum';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/interfaces/app.state.interface';
import { BackofficeActions } from '../../../../../state/actions/backoffice/backoffice.actions';

@Component({
  selector: 'proyecto-integrado-transports-backoffice',
  templateUrl: './transports-backoffice.component.html',
  styleUrls: ['./transports-backoffice.component.scss'],
})
export class TransportsBackofficeComponent {
  @Input() transports!: Observable<Transport[]>;
  constructor(
    private readonly dialog: MatDialog,
    private readonly store$: Store<AppState>
  ) {}

  openAddDialog() {
    this.dialog.open(TransportsDialogComponent, {
      data: {
        mode: FormModes.ADD,
      },
    });
  }

  openEditDialog(transport: Transport) {
    this.dialog.open(TransportsDialogComponent, {
      data: {
        mode: FormModes.EDIT,
        data: { transport },
      },
    });
  }

  openViewDialog(transport: Transport) {
    this.dialog.open(TransportsDialogComponent, {
      data: {
        mode: FormModes.VIEW,
        data: { transport },
      },
    });
  }

  delete(id: string | number) {
    this.store$.dispatch(
      BackofficeActions.deleteTransportRequest({ transportId: id as number })
    );
  }
}
