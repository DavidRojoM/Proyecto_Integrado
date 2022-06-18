import { Pipe, PipeTransform } from '@angular/core';
import { GenderEnum } from '../modules/wishlists/domain/enums/gender.enum';

@Pipe({
  name: 'GenderPipe',
})
export class GenderPipe implements PipeTransform {
  transform(value: GenderEnum, ...args: any[]): any {
    if (value === GenderEnum.F) return 'Female';
    return 'Male';
  }
}
