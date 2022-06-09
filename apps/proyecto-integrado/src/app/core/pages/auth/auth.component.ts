import { Component, ViewChild } from '@angular/core';
import { User } from '../../shared/modules/users/domain/interfaces/user.interface';
import { Credentials } from '../../shared/modules/auth/domain/credentials.interface';
import { MatTabGroup } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../state/actions/auth/auth.actions';
import { selectUserAdded } from '../../../state/selectors/auth/auth.selectors';

@Component({
  selector: 'proyecto-integrado-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  @ViewChild('tabs') tabGroup!: MatTabGroup;
  constructor(private readonly store$: Store<any>) {
    store$.select(selectUserAdded).subscribe((isAdded) => {
      if (isAdded) {
        this.tabGroup.selectedIndex = 0;
      }
    });
  }

  signup(user: User) {
    this.store$.dispatch(AuthActions.signupRequest({ user }));
  }

  login(credentials: Credentials) {
    this.store$.dispatch(AuthActions.loginRequest({ credentials }));
  }
}
