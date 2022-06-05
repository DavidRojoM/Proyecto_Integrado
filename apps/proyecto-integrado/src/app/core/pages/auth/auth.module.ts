import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthComponent, LoginComponent, SignupComponent],
  imports: [CommonModule, MatTabsModule, AuthRoutingModule],
})
export class AuthModule {}
