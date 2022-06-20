import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Destination } from '../../../../shared/modules/trips/domain/trips.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormModes } from '../../../../../common/components/form/interfaces/form-modes.enum';
import { DestinationsDialogComponent } from '../dialog/destinations-dialog.component';

@Component({
  selector: 'proyecto-integrado-destinations-backoffice',
  templateUrl: './destinations-backoffice.component.html',
  styleUrls: ['./destinations-backoffice.component.scss'],
})
export class DestinationsBackofficeComponent {
  @Input() destinations!: Observable<Destination[]>;

  constructor(private readonly dialog: MatDialog) {}

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

  delete($event: string | number) {}
}
