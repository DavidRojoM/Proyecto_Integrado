import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthActions } from './state/actions/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from './state/interfaces/app.state.interface';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import {
  selectIsAdmin,
  selectIsAuthenticated,
} from './state/selectors/auth/auth.selectors';
import { selectBalances } from './state/selectors/balances/balances.selectors';
import { MatDialog } from '@angular/material/dialog';
import { AddBalancesDialogComponent } from './core/dialogs/add-balances-dialog/add-balances-dialog.component';

@Component({
  selector: 'proyecto-integrado-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  isAuhenticated!: Observable<boolean>;
  isAdmin!: Observable<boolean>;
  userBalances!: Observable<number>;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    private readonly store$: Store<AppState>,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private readonly dialog: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isAuhenticated = this.store$.select(selectIsAuthenticated);
    this.isAdmin = this.store$.select(selectIsAdmin);
    this.userBalances = this.store$.select(selectBalances);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(snav: MatSidenav) {
    this.store$.dispatch(AuthActions.logoutRequest());
    snav.toggle();
  }

  addBalances() {
    this.dialog.open(AddBalancesDialogComponent);
  }
}
