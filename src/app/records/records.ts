import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-records',
  imports: [
    MatTableModule
  ],
  templateUrl: './records.html',
  styleUrl: './records.scss'
})
export class Records {
  dataSource = [];
  displayedColumns: string[] = ['id', 'first name', 'last name', 'age'];

}
