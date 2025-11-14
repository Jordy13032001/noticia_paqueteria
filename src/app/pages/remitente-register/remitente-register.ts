import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RemitenteService } from '../../services/remitente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remitente-register',
  standalone: true,
  templateUrl: './remitente-register.html',
  styleUrls: ['./remitente-register.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class RemitenteRegisterComponent {

  registroExitoso: boolean = false;

  formData = {
    nombre_completo: '',
    email: '',
    password: '',
    telefono: '',
    direccion: ''
  };

  constructor(
    private remitenteService: RemitenteService,
    private router: Router
  ) {}

  registrar(f: any) {
    if (f.invalid) return;

    this.remitenteService.registrarRemitente(this.formData)
      .subscribe({
        next: (res) => {
          console.log("✔ Remitente guardado en BD:", res);
          this.registroExitoso = true;

          // ⏳ Redirección después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          console.error("❌ Error al registrar:", err);
          alert("Error al registrar el remitente.");
        }
      });
  }

  cerrarModal() {
    this.registroExitoso = false;
  }
}
