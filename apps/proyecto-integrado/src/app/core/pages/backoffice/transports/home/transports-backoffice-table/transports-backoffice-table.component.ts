import { AfterViewInit, Component } from '@angular/core';
import { TableComponent } from '../../../../../../common/components/table/table.component';
import { Transport } from '../../../../../shared/modules/trips/domain/trips.interface';

@Component({
  selector: 'proyecto-integrado-transports-backoffice-table',
  templateUrl: './transports-backoffice-table.component.html',
  styleUrls: ['./transports-backoffice-table.component.scss'],
})
export class TransportsBackofficeTableComponent
  extends TableComponent<Transport>
  implements AfterViewInit
{
  constructor() {
    const cols = ['id', 'type', 'name', 'brand', 'price', 'actions'];
    super(cols);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
