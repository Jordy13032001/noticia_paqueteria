import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {

  formData = {
    email: '',
    password: ''
  };

  modalVisible = false;
  modalIcon = "";
  modalTitulo = "";
  modalMensaje = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(f: any) {
    if (f.invalid) return;

    this.authService.login(this.formData).subscribe({
      next: (res) => {

        this.authService.setToken(res.token);

        this.modalIcon = "✅";
        this.modalTitulo = "Bienvenido";
        this.modalMensaje = "Inicio de sesión exitoso.";
        this.modalVisible = true;

        setTimeout(() => {
          // Redirección según rol
          if (res.role === "admin") {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, 2000);
      },
      error: () => {
        this.modalIcon = "❌";
        this.modalTitulo = "Error";
        this.modalMensaje = "Credenciales incorrectas.";
        this.modalVisible = true;
      }
    });
  }

  cerrarModal() {
    this.modalVisible = false;
  }
}
