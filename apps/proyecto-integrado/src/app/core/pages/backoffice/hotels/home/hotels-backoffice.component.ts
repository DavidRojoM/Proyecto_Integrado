import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../../../../shared/modules/trips/domain/trips.interface';
import { MatDialog } from '@angular/material/dialog';
import { HotelsDialogComponent } from '../dialog/hotels-dialog.component';
import { FormModes } from '../../../../../common/components/form/interfaces/form-modes.enum';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/interfaces/app.state.interface';
import { BackofficeActions } from '../../../../../state/actions/backoffice/backoffice.actions';

@Component({
  selector: 'proyecto-integrado-hotels-backoffice',
  templateUrl: './hotels-backoffice.component.html',
  styleUrls: ['./hotels-backoffice.component.scss'],
})
export class HotelsBackofficeComponent {
  @Input() hotels!: Observable<Hotel[]>;
  constructor(
    private readonly dialog: MatDialog,
    private readonly store$: Store<AppState>
  ) {}

  openAddDialog() {
    this.dialog.open(HotelsDialogComponent, {
      data: {
        mode: FormModes.ADD,
      },
    });
  }

  openEditDialog(hotel: Hotel) {
    this.dialog.open(HotelsDialogComponent, {
      data: {
        mode: FormModes.EDIT,
        data: { hotel },
      },
    });
  }

  openViewDialog(hotel: Hotel) {
    this.dialog.open(HotelsDialogComponent, {
      data: {
        mode: FormModes.VIEW,
        data: { hotel },
      },
    });
  }

  delete(id: string | number) {
    this.store$.dispatch(
      BackofficeActions.deleteHotelRequest({ hotelId: id as number })
    );
  }
}
