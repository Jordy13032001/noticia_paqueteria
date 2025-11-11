import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rastreo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rastreo.html',
  styleUrl: './rastreo.css'
})
export class RastreoComponent {
  idRastreo = '';
  resultado: any = null;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  buscarEnvio() {
    this.http.get(`http://localhost:3000/api/envios/${this.idRastreo}`).subscribe({
      next: (data) => {
        this.resultado = data;
        this.error = null;
      },
      error: () => {
        this.resultado = null;
        this.error = 'No se encontró el envío o no tiene permisos para rastrearlo.';
      }
    });
  }
}
