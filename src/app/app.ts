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
  styleUrls: ['./app.css'] // ✅ corregido (plural)
})
export class AppComponent implements OnInit {
  currentYear = new Date().getFullYear();
  isLoggedIn = false;
  isAdmin = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.verificarEstado();

    // 🔄 Revisa sesión en cada navegación (útil tras login o logout)
    this.router.events.subscribe(() => {
      this.verificarEstado();
    });
  }

  verificarEstado() {
    // ⚙️ Evita errores en SSR
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
