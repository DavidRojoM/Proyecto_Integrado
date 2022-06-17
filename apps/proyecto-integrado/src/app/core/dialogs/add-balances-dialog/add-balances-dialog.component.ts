import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/interfaces/app.state.interface';
import { AuthActions } from '../../../state/actions/auth/auth.actions';

@Component({
  selector: 'proyecto-integrado-add-balances-dialog',
  templateUrl: './add-balances-dialog.component.html',
  styleUrls: ['./add-balances-dialog.component.scss'],
})
export class AddBalancesDialogComponent {
  form = this.fb.group({
    amount: ['', [Validators.required, Validators.min(1)]],
  });

  constructor(private fb: FormBuilder, private store$: Store<AppState>) {}

  addBalances() {
    if (this.form.valid) {
      this.store$.dispatch(
        AuthActions.addBalancesRequest({ amount: this.form.value.amount })
      );
    }
  }
}
