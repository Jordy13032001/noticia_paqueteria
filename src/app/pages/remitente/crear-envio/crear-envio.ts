import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RemitenteEnvioService } from '../../../services/remitente-envio.service';

@Component({
  selector: 'app-crear-envio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-envio.html',
  styleUrls: ['./crear-envio.css']
})
export class CrearEnvioComponent {

  private envioService = inject(RemitenteEnvioService);

  // OBJETO DEL FORMULARIO
  formData = {
    destinatario: {
      nombre: '',
      direccion: '',
      telefono: ''
    },
    paquete: {
      descripcion: '',
      peso_kg: 0,
      tipo_envio: 'nacional',
      valor_envio: 0
    }
  };

  mensajeOK = '';
  mensajeError = '';

  enviar(form: NgForm) {
    if (form.invalid) return;

    this.envioService.crearEnvioCompleto(this.formData).subscribe({
      next: (res) => {
        this.mensajeOK = '✔ Envío creado correctamente';
        this.mensajeError = '';
        form.resetForm();
      },
      error: (err) => {
        this.mensajeError = '❌ Error al crear el envío.';
        this.mensajeOK = '';
        console.error(err);
      }
    });
  }
}
