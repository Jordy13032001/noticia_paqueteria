import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css'],
  imports: [CommonModule, FormsModule]
})
export class ContactoComponent {

  contacto = {
    nombre: '',
    correo: '',
    mensaje: ''
  };

  enviado = false;
  error = false;

  constructor(private contactoService: ContactoService) {}

  enviar(form: any) {
    if (form.invalid) return;

    this.contactoService.enviarMensaje(this.contacto).subscribe({
      next: () => {
        this.enviado = true;
        this.error = false;
        form.reset();
      },
      error: () => {
        this.error = true;
      }
    });
  }
}
