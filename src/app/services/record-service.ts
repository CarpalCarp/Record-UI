import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface RecordDetails {
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zip: number
  }
}

export interface RawRecord {
  id: string
  firstName: string
  lastName: string
  age: number
  description: string
  dateOfBirth: Date
  details: RecordDetails
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
