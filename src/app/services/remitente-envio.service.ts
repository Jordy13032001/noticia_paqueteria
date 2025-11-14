import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RemitenteEnvioService {

  private http = inject(HttpClient);

  // 🔥 URL CORRECTA DEL BACKEND
  private url = 'http://localhost:3000/api/remitentes/envios/crear';

  // Obtiene token desde localStorage
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // 🔥 Crear envío completo (destinatario + paquete + envío)
  crearEnvioCompleto(data: any) {
    return this.http.post(this.url, data, this.getHeaders());
  }
}
