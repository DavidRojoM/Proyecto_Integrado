import { Component, ViewChild } from '@angular/core';
import { UsersService } from '../../shared/modules/users/services/users.service';
import { User } from '../../shared/modules/users/domain/interfaces/user.interface';
import { Credentials } from '../../shared/modules/auth/domain/credentials.interface';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'proyecto-integrado-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  @ViewChild('tabs') tabGroup!: MatTabGroup;
  constructor(
    private readonly usersService: UsersService,
    private readonly router: Router,
    private readonly localStorageService: LocalStorageService
  ) {}

  signup(user: User) {
    this.usersService.signup(user).subscribe(() => {
      this.tabGroup.selectedIndex = 0;
    });
  }

  login(credentials: Credentials) {
    this.usersService.login(credentials).subscribe((res) => {
      if (res.access_token) {
        this.localStorageService.setItem('access_token', res.access_token);
        this.localStorageService.setItem('userId', res.user.id);
        this.localStorageService.setItem('role', res.user.role);
        this.localStorageService.setItem('username', res.user.username);
        this.router.navigate(['/home']);
      }
    });
  }

  logout() {
    this.localStorageService.removeItem('access_token');
    this.localStorageService.removeItem('userId');
    this.localStorageService.removeItem('role');
    this.localStorageService.removeItem('username');
    this.router.navigate(['/']);
  }
}
