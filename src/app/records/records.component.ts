import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawRecord } from '../services/record.service';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, ColDef } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';

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
    { field: 'firstName', enableRowGroup: true, flex: 1 },
    { field: 'lastName', enableRowGroup: true, flex: 1 },
    { field: 'age', enableRowGroup: true, flex: 1 }
  ];
  rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';

  constructor(private activatedRoute: ActivatedRoute) {
    this.dataSource = this.activatedRoute.snapshot.data['records'];
  }
}
