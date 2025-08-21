import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawRecord } from '../services/record.service';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ModuleRegistry, ColDef, GridApi } from 'ag-grid-community';
import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

ModuleRegistry.registerModules([AllEnterpriseModule.with(AgChartsEnterpriseModule)]);

type GroupingOptions = 'firstName' | 'lastName' | 'age' | 'noGrouping';

interface GroupingSelection {
  value: GroupingOptions
  viewValue: string
}

@Component({
  selector: 'app-records',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
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
    { field: 'firstName', flex: 1 },
    { field: 'lastName', flex: 1 },
    { field: 'age', flex: 1 }
  ];
  groups: GroupingSelection[] = [
    { value: 'firstName', viewValue: 'First Name' },
    { value: 'lastName', viewValue: 'Last Name' },
    { value: 'age', viewValue: 'Age' }
  ];
  groupSelection = signal('noGrouping' as GroupingOptions);

  private gridApi!: GridApi<RawRecord>;

  constructor(private activatedRoute: ActivatedRoute) {
    this.dataSource = this.activatedRoute.snapshot.data['records'];
  }

  changeTable(group: GroupingOptions) {
    const updatedColData = this.displayedColumns.map(col => {
      if (col.field === group) {
        return { ...col, rowGroup: true };
      } else {
        return { ...col, rowGroup: false };
      }
    });
    this.groupSelection.set(group);
    this.displayedColumns = updatedColData;
    this.gridApi.setGridOption("rowData", this.dataSource);
  }
}
