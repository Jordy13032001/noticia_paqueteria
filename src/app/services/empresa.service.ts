import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost:3000/api/empresa';
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  obtenerEmpresa(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(err => {
        console.error('❌ Error al obtener empresa:', err);
        return throwError(() => err);
      })
    );
  }

  actualizarEmpresa(datos: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(this.apiUrl, datos, { headers }).pipe(
      catchError(err => {
        console.error('❌ Error al actualizar empresa:', err);
        return throwError(() => err);
      })
    );
  }
}
