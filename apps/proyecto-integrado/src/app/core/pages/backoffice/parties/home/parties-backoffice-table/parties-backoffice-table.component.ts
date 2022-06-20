import { AfterViewInit, Component } from '@angular/core';
import { TableComponent } from '../../../../../../common/components/table/table.component';
import { PartyOutput } from '../../../../../shared/modules/parties/domain/parties.interface';

@Component({
  selector: 'proyecto-integrado-parties-backoffice-table',
  templateUrl: './parties-backoffice-table.component.html',
  styleUrls: ['./parties-backoffice-table.component.scss'],
})
export class PartiesBackofficeTableComponent
  extends TableComponent<PartyOutput>
  implements AfterViewInit
{
  constructor() {
    const cols = ['id', 'name', 'status', 'actions'];
    super(cols);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
  }
}
