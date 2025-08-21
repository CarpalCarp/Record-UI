import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawRecord } from '../services/record.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, ColDef } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';

ModuleRegistry.registerModules([AllEnterpriseModule.with(AgChartsEnterpriseModule)]);

interface TableRow extends RawRecord {
  expanded: boolean
}

type GroupingOptions = 'firstName' | 'lastName' | 'age' | 'noGrouping';

@Component({
  selector: 'app-records',
  imports: [
    MatButtonModule,
    CommonModule,
    AgGridAngular
  ],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss'
})
export class Records {
  dataSource: TableRow[] = [];
  displayedColumns: ColDef[] = [
    { field: 'id', flex: 1, hide: true },
    { field: 'firstName', flex: 1, rowGroup: true },
    { field: 'lastName', flex: 1 },
    { field: 'age', flex: 1 }
  ];
  groupBy: GroupingOptions = 'noGrouping';

  constructor(private activatedRoute: ActivatedRoute) {
    const rawData = this.activatedRoute.snapshot.data['records'];
    this.dataSource = rawData.map((data: RawRecord) => {
      return {
        ...data,
        expanded: false
      }
    });
  }
}
