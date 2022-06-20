import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PartyOutput } from '../../../../shared/modules/parties/domain/parties.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormModes } from '../../../../../common/components/form/interfaces/form-modes.enum';
import { PartiesDialogComponent } from '../dialog/parties-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/interfaces/app.state.interface';
import { BackofficeActions } from '../../../../../state/actions/backoffice/backoffice.actions';

@Component({
  selector: 'proyecto-integrado-parties-backoffice',
  templateUrl: './parties-backoffice.component.html',
  styleUrls: ['./parties-backoffice.component.scss'],
})
export class PartiesBackofficeComponent {
  @Input() parties!: Observable<PartyOutput[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store$: Store<AppState>
  ) {}

  openAddDialog() {
    this.dialog.open(PartiesDialogComponent, {
      data: {
        mode: FormModes.ADD,
      },
    });
  }

  openEditDialog(party: PartyOutput) {
    this.dialog.open(PartiesDialogComponent, {
      data: {
        mode: FormModes.EDIT,
        data: { party },
      },
    });
  }

  openViewDialog(party: PartyOutput) {
    this.dialog.open(PartiesDialogComponent, {
      data: {
        mode: FormModes.VIEW,
        data: { party },
      },
    });
  }

  delete(partyId: string | number) {
    this.store$.dispatch(
      BackofficeActions.deletePartyRequest({ partyId: partyId as string })
    );
  }
}
