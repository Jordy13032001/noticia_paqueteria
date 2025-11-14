import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemitenteService {

  private API_URL = 'http://localhost:3000/api/remitentes';

  constructor(private http: HttpClient) {}

  registrarRemitente(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, data);
  }

  loginRemitente(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data);
  }
}
