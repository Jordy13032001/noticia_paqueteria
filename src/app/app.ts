import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  currentYear = new Date().getFullYear();
  isLoggedIn = false;
  isAdmin = false;
  isDarkMode = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.verificarEstado();

    // 🌓 Cargar tema guardado (solo si estamos en navegador)
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      this.isDarkMode = savedTheme === 'dark';
    }

    // 🔄 Revisa sesión en cada navegación
    this.router.events.subscribe(() => this.verificarEstado());
  }

  toggleTheme() {
    if (typeof window === 'undefined') return;

    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
  verificarEstado() {
    if (typeof window === 'undefined') return;

    const token = this.authService.getToken();
    if (token) {
      this.isLoggedIn = true;
      try {
        const decoded: any = jwtDecode(token);
        this.isAdmin = decoded.rol === 'admin';
      } catch {
        this.isAdmin = false;
      }
    } else {
      this.isLoggedIn = false;
      this.isAdmin = false;
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/']);
  }

}
