import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RawRecord } from '../services/record-service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface TableRecord extends RawRecord {
  expanded: boolean
}

@Component({
  selector: 'app-records',
  imports: [
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './records.html',
  styleUrl: './records.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class Records {
  dataSource: TableRecord[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age'];

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
