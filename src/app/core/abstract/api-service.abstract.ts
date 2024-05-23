import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {
  protected apiUrl = environment.api.url;
  protected http = inject(HttpClient);
}
