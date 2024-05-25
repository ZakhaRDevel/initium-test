import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../abstract/api-service.abstract';
import { HttpParams } from '@angular/common/http';
import { RecordModel } from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService extends ApiService {
  getRecords(filters: any = {}): Observable<RecordModel[]> {
    const params = new HttpParams({ fromObject: filters });
    return this.http.get<RecordModel[]>(`${this.apiUrl}/users`, { params });
  }

  deleteRecords(ids: number[]): Observable<any> {
    const options = {
      headers: { 'Content-Type': 'application/json' },
      body: { ids }
    };
    return this.http.delete(`${this.apiUrl}/users`, options);
  }

  addRecord(record: RecordModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, record);
  }

  updateRecord(record: RecordModel): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${record.id}`, record);
  }
}
