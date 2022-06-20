import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Destination } from '../../../../shared/modules/trips/domain/trips.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormModes } from '../../../../../common/components/form/interfaces/form-modes.enum';
import { DestinationsDialogComponent } from '../dialog/destinations-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/interfaces/app.state.interface';
import { BackofficeActions } from '../../../../../state/actions/backoffice/backoffice.actions';

@Component({
  selector: 'proyecto-integrado-destinations-backoffice',
  templateUrl: './destinations-backoffice.component.html',
  styleUrls: ['./destinations-backoffice.component.scss'],
})
export class DestinationsBackofficeComponent {
  @Input() destinations!: Observable<Destination[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store$: Store<AppState>
  ) {}

  openAddDialog() {
    this.dialog.open(DestinationsDialogComponent, {
      data: {
        mode: FormModes.ADD,
      },
    });
  }

  openEditDialog(destination: Destination) {
    this.dialog.open(DestinationsDialogComponent, {
      data: {
        mode: FormModes.EDIT,
        data: { destination },
      },
    });
  }

  openViewDialog(destination: Destination) {
    this.dialog.open(DestinationsDialogComponent, {
      data: {
        mode: FormModes.VIEW,
        data: { destination },
      },
    });
  }

  delete(id: string | number) {
    this.store$.dispatch(
      BackofficeActions.deleteDestinationRequest({
        destinationId: id as number,
      })
    );
  }
}
