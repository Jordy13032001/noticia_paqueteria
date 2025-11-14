import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rastreo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rastreo.html',
  styleUrls: ['./rastreo.css']
})
export class RastreoComponent {

  private http = inject(HttpClient);

  codigo = "";
  envio: any = null;
  error = "";

  buscar() {
    this.error = "";
    this.envio = null;

    this.http.get(`http://localhost:3000/api/rastreo/${this.codigo}`).subscribe({
      next: (res) => {
        this.envio = res;
      },
      error: () => {
        this.error = "❌ No se encontró un envío con ese código.";
      }
    });
  }
}
