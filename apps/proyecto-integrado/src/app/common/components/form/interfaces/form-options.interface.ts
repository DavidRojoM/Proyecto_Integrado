import { FormModes } from './form-modes.enum';

export interface FormOptions {
  mode: FormModes;
  data: { [key: string]: any };
}
