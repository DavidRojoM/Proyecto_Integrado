import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/interfaces/app.state.interface';
import { selectUser } from '../../../state/selectors/auth/auth.selectors';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../shared/modules/users/domain/interfaces/user.interface';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@Component({
  selector: 'proyecto-integrado-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  panelOpenState = false;
  me$ = this.store$.select(selectUser);
  constructor(
    private readonly store$: Store<AppState>,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  editProfile(me: User) {
    this.dialog.open(EditProfileComponent, {
      data: {
        me,
      },
    });
  }
}
