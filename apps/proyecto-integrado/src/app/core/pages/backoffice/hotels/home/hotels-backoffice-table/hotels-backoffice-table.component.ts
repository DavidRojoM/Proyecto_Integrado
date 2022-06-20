import { AfterViewInit, Component } from '@angular/core';
import { TableComponent } from '../../../../../../common/components/table/table.component';
import { Hotel } from '../../../../../shared/modules/trips/domain/trips.interface';

@Component({
  selector: 'proyecto-integrado-hotels-backoffice-table',
  templateUrl: './hotels-backoffice-table.component.html',
  styleUrls: ['./hotels-backoffice-table.component.scss'],
})
export class HotelsBackofficeTableComponent
  extends TableComponent<Hotel>
  implements AfterViewInit
{
  constructor() {
    const cols = ['id', 'name', 'address', 'phone', 'nightPrice', 'actions'];
    super(cols);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
