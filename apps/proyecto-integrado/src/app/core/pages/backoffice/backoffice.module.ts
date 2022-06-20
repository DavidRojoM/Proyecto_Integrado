import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { TransportsBackofficeComponent } from './transports/home/transports-backoffice.component';
import { PartiesBackofficeComponent } from './parties/home/parties-backoffice.component';
import { HotelsBackofficeComponent } from './hotels/home/hotels-backoffice.component';
import { DestinationsBackofficeComponent } from './destinations/home/destinations-backoffice.component';
import { UsersBackofficeComponent } from './users/home/users-backoffice.component';
import { UsersBackofficeTableComponent } from './users/home/users-backoffice-table/users-backoffice-table.component';
import { HotelsBackofficeTableComponent } from './hotels/home/hotels-backoffice-table/hotels-backoffice-table.component';
import { DestinationsBackofficeTableComponent } from './destinations/home/destinations-backoffice-table/destinations-backoffice-table.component';
import { PartiesBackofficeTableComponent } from './parties/home/parties-backoffice-table/parties-backoffice-table.component';
import { TransportsBackofficeTableComponent } from './transports/home/transports-backoffice-table/transports-backoffice-table.component';
import { DestinationsDialogComponent } from './destinations/dialog/destinations-dialog.component';
import { DestinationsFormComponent } from './destinations/dialog/form/destinations-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HotelsDialogComponent } from './hotels/dialog/hotels-dialog.component';
import { HotelsFormComponent } from './hotels/dialog/form/hotels-form.component';
import { TransportsDialogComponent } from './transports/dialog/transports-dialog.component';
import { TransportsFormComponent } from './transports/dialog/form/transports-form.component';
import { PartiesDialogComponent } from './parties/dialog/parties-dialog.component';
import { PartiesFormComponent } from './parties/dialog/form/parties-form.component';
import { UsersFormComponent } from './users/dialog/form/users-form.component';
import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import { SharedModule } from '../../shared/shared.module';
import { UsersDialogComponent } from './users/dialog/users-dialog.component';

@NgModule({
  declarations: [
    BackofficeComponent,
    TransportsBackofficeComponent,
    PartiesBackofficeComponent,
    HotelsBackofficeComponent,
    DestinationsBackofficeComponent,
    UsersBackofficeComponent,
    UsersBackofficeTableComponent,
    HotelsBackofficeTableComponent,
    DestinationsBackofficeTableComponent,
    PartiesBackofficeTableComponent,
    TransportsBackofficeTableComponent,
    DestinationsDialogComponent,
    DestinationsFormComponent,
    HotelsDialogComponent,
    HotelsFormComponent,
    TransportsDialogComponent,
    TransportsFormComponent,
    PartiesDialogComponent,
    PartiesFormComponent,
    UsersFormComponent,
    UsersDialogComponent,
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxFileDragDropModule,
    SharedModule,
  ],
})
export class BackofficeModule {}
