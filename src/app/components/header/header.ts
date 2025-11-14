import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  isAdmin = false;
  isRemitente = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.actualizarEstado();
    this.router.events.subscribe(() => this.actualizarEstado());
  }

  actualizarEstado() {
    const token = this.authService.getToken();

    if (!token) {
      this.reset();
      return;
    }

    try {
      const decoded: any = jwtDecode(token);

      this.isLoggedIn = true;
      this.isAdmin = decoded.rol === 'admin';
      this.isRemitente = !!decoded.id_remitente;

    } catch (error) {
      console.error("Token inválido:", error);
      this.reset();
    }
  }

  reset() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.isRemitente = false;
  }

  logout() {
    this.authService.logout();
    this.reset();
    this.router.navigate(['/']);
  }
}
