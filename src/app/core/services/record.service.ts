import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../abstract/api-service.abstract';

@Injectable({
  providedIn: 'root'
})
export class RecordService extends ApiService {
  getRecords(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }
}
