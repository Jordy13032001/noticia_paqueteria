import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  // =============================
  // 🔥 URLs
  // =============================
  private adminUrl = 'http://localhost:3000/api/auth/login';
  private remitenteUrl = 'http://localhost:3000/api/remitentes/login';
  private remitenteRegisterUrl = 'http://localhost:3000/api/remitentes/register';

  // =============================
  // 🔥 REGISTRO REMITENTE
  // =============================
  registerRemitente(data: any): Observable<any> {
    return this.http.post(this.remitenteRegisterUrl, data);
  }

  // =============================
  // 🔥 LOGIN UNIVERSAL (Admin o Remitente)
  // =============================
  login(credentials: any): Observable<any> {
    return this.http.post(this.adminUrl, credentials).pipe(
      switchMap((res: any) => {
        // SI ADMIN FUNCIONA RETORNAR DIRECTO
        return new Observable((obs) => {
          obs.next({ ...res, role: 'admin' });
          obs.complete();
        });
      }),
      catchError(() => {
        // SI ADMIN FALLA → PROBAR REMITENTE
        return this.http.post(this.remitenteUrl, credentials).pipe(
          switchMap((res: any) => {
            return new Observable((obs) => {
              obs.next({ ...res, role: 'remitente' });
              obs.complete();
            });
          }),
          catchError(err => {
            return throwError(() => ({
              message: 'Credenciales inválidas para admin y remitente',
              error: err
            }));
          })
        );
      })
    );
  }

  // =============================
  // 🔥 TOKEN HANDLING (compatible SSR)
  // =============================
  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}
