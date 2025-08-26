import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export interface RawRecord {
  id: string
  firstName: string
  lastName: string
  age: number
  description: string
  dateOfBirth: Date
  email: string
  phone: string
  street: string
  city: string
  state: string
  zip: number
}

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  baseUrl = '/app/records';

  constructor(private http: HttpClient) { }

  getRecords() {
    const records$ = this.http.get('http://localhost:3000' + this.baseUrl);
    return firstValueFrom(records$);
  }

  getRecordById() { }

  addRecord() { }

  updateRecord() { }

  deleteRecord() { }
}
