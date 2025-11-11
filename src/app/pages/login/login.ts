import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    console.log('✅ onLogin() ejecutado');
    console.log('📧', this.email, '🔑', this.password);

    if (!this.email || !this.password) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('🎉 Login exitoso:', res);
        this.authService.setToken(res.token);
        alert('✅ Sesión iniciada correctamente');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('❌ Error al iniciar sesión:', err);
        alert('❌ Credenciales incorrectas o error del servidor');
      }
    });
  }
}
