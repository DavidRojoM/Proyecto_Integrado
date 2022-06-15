import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/interfaces/app.state.interface';
import { PartiesActions } from '../../../../state/actions/parties/parties.actions';

@Component({
  selector: 'proyecto-integrado-add-party-dialog',
  templateUrl: './add-party-dialog.component.html',
  styleUrls: ['./add-party-dialog.component.scss'],
})
export class AddPartyDialogComponent {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly store$: Store<AppState>
  ) {}

  createParty() {
    if (this.form.valid) {
      const name = this.form.get('name')?.value;
      this.store$.dispatch(
        PartiesActions.createPartyRequest({
          name: name,
        })
      );
    }
  }
}
