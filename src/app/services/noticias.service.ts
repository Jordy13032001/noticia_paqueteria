import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Noticia {
  id_noticia: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  url_imagen?: string;
}

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private apiUrl = 'http://localhost:3000/api/noticias';

  constructor(private http: HttpClient) {}

  // 🟢 Obtener todas las noticias
  listar(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.apiUrl);
  }

  // 🟡 Crear nueva noticia
  crear(nuevaNoticia: Partial<Noticia>): Observable<Noticia> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
    return this.http.post<Noticia>(this.apiUrl, nuevaNoticia, { headers });
  }

  // 🔴 Eliminar noticia
  eliminar(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
