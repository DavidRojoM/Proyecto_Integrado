import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MaterialModule,
    SharedModule,
    NgxFileDragDropModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule {}
