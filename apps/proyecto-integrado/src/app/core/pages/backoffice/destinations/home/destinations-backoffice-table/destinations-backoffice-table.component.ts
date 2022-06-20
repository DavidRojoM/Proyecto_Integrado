import { AfterViewInit, Component } from '@angular/core';
import { TableComponent } from '../../../../../../common/components/table/table.component';
import { Destination } from '../../../../../shared/modules/trips/domain/trips.interface';

@Component({
  selector: 'proyecto-integrado-destinations-backoffice-table',
  templateUrl: './destinations-backoffice-table.component.html',
  styleUrls: ['./destinations-backoffice-table.component.scss'],
})
export class DestinationsBackofficeTableComponent
  extends TableComponent<Destination>
  implements AfterViewInit
{
  constructor() {
    const cols = ['id', 'name', 'description', 'actions'];
    super(cols);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
