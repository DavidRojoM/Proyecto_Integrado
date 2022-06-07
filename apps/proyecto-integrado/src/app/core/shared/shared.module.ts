import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './services/snackbar.service';
import { UsersService } from './modules/users/services/users.service';
import { CountryService } from './modules/country/services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [MatSnackBar, SnackbarService, UsersService, CountryService],
})
export class SharedModule {}
