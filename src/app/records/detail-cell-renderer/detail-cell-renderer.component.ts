import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-enterprise';

@Component({
  selector: 'app-detail-cell-renderer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './detail-cell-renderer.component.html',
  styleUrl: './detail-cell-renderer.component.scss'
})
export class DetailCellRenderer implements ICellRendererAngularComp {
  params!: ICellRendererParams;
  masterGridApi!: GridApi;
  rowData!: any[];

  agInit(params: any): void {
    this.params = params;
    this.masterGridApi = params.api;

    this.rowData = params.data.callRecords;
  }

  refresh(params: any): boolean {
    return false;
  }
}
