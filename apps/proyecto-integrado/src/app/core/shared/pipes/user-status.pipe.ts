import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'UserStatusPipe',
})
export class UserStatusPipe implements PipeTransform {
  userStatusMap: { [index: string]: string } = {
    PENDING: '⏳',
    READY: '✅',
    ORGANIZER: '📆',
  };

  transform(value: string | undefined, ...args: any[]): any {
    if (!value) {
      return this.userStatusMap['PENDING'];
    }
    if (!(value in this.userStatusMap)) {
      return this.userStatusMap['PENDING'];
    }
    return this.userStatusMap[value];
  }
}
