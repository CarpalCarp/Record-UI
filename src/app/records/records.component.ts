import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RawRecord } from '../services/record.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

interface TableRow extends RawRecord {
  expanded: boolean
}

interface GroupingRow {
  groupingRow: true
  value: string | number
  count: number
}

type GroupingOptions = 'firstName' | 'lastName' | 'age' | 'noGrouping';

@Component({
  selector: 'app-records',
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class Records {
  dataSource: (TableRow | GroupingRow)[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age'];
  originalNonGroupedTable: (TableRow | GroupingRow)[] = [];
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

  restructureTable(order: GroupingOptions) {
    if (this.originalNonGroupedTable.length > 0) {
      this.dataSource = [...this.originalNonGroupedTable];
    }
    if (order !== 'noGrouping') {
      this.originalNonGroupedTable = [...this.dataSource];
      const groupMap = this.createGroupMap(order);
      const groupList = this.createGroupList(groupMap);
      console.log('groupList: ', groupList);
      this.dataSource = groupList;
    } else {
      this.dataSource = this.originalNonGroupedTable;
    }
  }

  createGroupMap(order: Exclude<GroupingOptions, 'noGrouping'>): Map<string | number, TableRow[]> {
    const groupMap = new Map<string | number, TableRow[]>();
    for (const tableRecord of this.dataSource as TableRow[]) {
      const tableValue = tableRecord[order];
      if (!groupMap.has(tableValue)) {
        groupMap.set(tableValue, [tableRecord]);
      } else {
        const list = groupMap.get(tableValue) ?? [];
        list.push(tableRecord);
        groupMap.set(tableValue, [...list]);
      }
    }
    return groupMap;
  }

  createGroupList(groupMap: Map<string | number, TableRow[]>): (TableRow | GroupingRow)[] {
    let groupList: (TableRow | GroupingRow)[] = [];
    for (const [groupByValue, tableRecords] of [...groupMap]) {
      groupList.push({ groupingRow: true, value: groupByValue, count: tableRecords.length });
      groupList.push(...tableRecords);
    }
    return groupList;
  }

  isGroupingRow(index: number, rowData: (TableRow | GroupingRow)) {
    if ((rowData as GroupingRow).groupingRow) {
      return true;
    } else {
      return false;
    }
  }

  isRecordRow(index: number, rowData: (TableRow | GroupingRow)) {
    if (!(rowData as GroupingRow).groupingRow) {
      return true;
    } else {
      return false;
    }
  }
}
