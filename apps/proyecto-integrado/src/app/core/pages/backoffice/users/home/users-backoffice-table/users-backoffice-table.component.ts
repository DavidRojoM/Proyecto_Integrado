import { AfterViewInit, Component } from '@angular/core';
import { TableComponent } from '../../../../../../common/components/table/table.component';
import { User } from '../../../../../shared/modules/users/domain/interfaces/user.interface';

@Component({
  selector: 'proyecto-integrado-users-backoffice-table',
  templateUrl: './users-backoffice-table.component.html',
  styleUrls: ['./users-backoffice-table.component.scss'],
})
export class UsersBackofficeTableComponent
  extends TableComponent<User>
  implements AfterViewInit
{
  constructor() {
    const cols = [
      'id',
      'username',
      'email',
      'nationality',
      'role',
      'banned',
      'actions',
    ];
    super(cols);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
