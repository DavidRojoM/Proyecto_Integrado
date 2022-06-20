import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './services/snackbar.service';
import { UsersService } from './modules/users/services/users.service';
import { CountryService } from './modules/country/services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './modules/auth/services/auth.service';
import { LocalStorageService } from './services/local-storage.service';
import { PartiesService } from './modules/parties/services/parties.service';
import { ChatService } from './modules/comms/services/chat.service';
import { ChatGqlRepository } from './modules/comms/services/gql-repository/chat-gql.repository';
import { TripService } from './modules/trips/services/trip.service';
import { UserStatusPipe } from './pipes/user-status.pipe';

@NgModule({
  declarations: [UserStatusPipe],
  imports: [CommonModule],
  providers: [
    MatSnackBar,
    SnackbarService,
    LocalStorageService,
    UsersService,
    CountryService,
    AuthService,
    PartiesService,
    ChatService,
    ChatGqlRepository,
    TripService,
  ],
  exports: [UserStatusPipe],
})
export class SharedModule {}
