import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RemitenteService {

  private http = inject(HttpClient);
  private api = 'http://localhost:3000/api/remitentes';

  register(data: any): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.api}/login`, data);
  }
}
