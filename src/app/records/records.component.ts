import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawRecord } from '../services/record.service';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, ColDef, FirstDataRenderedEvent } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';
import { DetailCellRenderer } from './detail-cell-renderer/detail-cell-renderer.component';

ModuleRegistry.registerModules([AllEnterpriseModule.with(AgChartsEnterpriseModule)]);

@Component({
  selector: 'app-records',
  imports: [
    CommonModule,
    AgGridAngular
  ],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class Records {
  dataSource: RawRecord[] = [];
  displayedColumns: ColDef[] = [
    { field: 'id', flex: 1, hide: true },
    { field: 'firstName', enableRowGroup: true, flex: 1, cellRenderer: 'agGroupCellRenderer' },
    { field: 'lastName', enableRowGroup: true, flex: 1 },
    { field: 'age', enableRowGroup: true, flex: 1 }
  ];
  rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';

  detailCellRenderer: any = DetailCellRenderer;
  // params sent to the Detail Cell Renderer, in this case your MyCellRendererComp
  detailCellRendererParams = {};

  constructor(private activatedRoute: ActivatedRoute) {
    this.dataSource = this.activatedRoute.snapshot.data['records'];
  }

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.forEachNode((node) => {
      node.setExpanded(node.id === "1");
    });
  }
}
