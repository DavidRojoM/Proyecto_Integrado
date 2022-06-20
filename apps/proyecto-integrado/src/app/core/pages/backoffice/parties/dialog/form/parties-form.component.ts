import { Component, OnInit } from '@angular/core';
import { FormComponent } from 'apps/proyecto-integrado/src/app/common/components/form/form.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormModes } from '../../../../../../common/components/form/interfaces/form-modes.enum';

@Component({
  selector: 'proyecto-integrado-parties-form',
  templateUrl: './parties-form.component.html',
  styleUrls: ['./parties-form.component.scss'],
})
export class PartiesFormComponent extends FormComponent implements OnInit {
  disabled!: boolean;

  constructor(override fb: FormBuilder) {
    super(fb, {
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
    });
  }

  ngOnInit(): void {
    this.disabled = this.options.mode === FormModes.VIEW;
    if (this.options.mode !== FormModes.ADD) {
      this.form.controls['name'].setValue(this.options.data['party'].name);
    }
  }
}