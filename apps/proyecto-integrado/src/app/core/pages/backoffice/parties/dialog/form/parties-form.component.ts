import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormModes } from '../../../../../../common/components/form/interfaces/form-modes.enum';
import { FormComponent } from '../../../../../../common/components/form/form.component';

@Component({
  selector: 'proyecto-integrado-parties-form',
  templateUrl: './parties-form.component.html',
  styleUrls: ['./parties-form.component.scss'],
})
export class PartiesFormComponent extends FormComponent implements OnInit {
  disabled!: boolean;

  constructor(override fb: FormBuilder) {
    super(fb, {
      id: new FormControl(''),
      status: new FormControl(''),

      name: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }

  ngOnInit(): void {
    this.disabled = this.options.mode === FormModes.VIEW;
    if (this.options.mode !== FormModes.ADD) {
      this.form.controls['name'].setValue(this.options.data['party'].name);
      this.form.controls['status'].setValue(this.options.data['party'].status);
      this.form.controls['id'].setValue(this.options.data['party'].id);
    }
  }
}
