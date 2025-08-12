import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RecordService } from '../../services/record.service';


@Injectable({
  providedIn: 'root'
})
export class RecordsResolver implements Resolve<any> {
  constructor(private recordSrv: RecordService) { }

  resolve() {
    return this.recordSrv.getRecords();
  };
}
