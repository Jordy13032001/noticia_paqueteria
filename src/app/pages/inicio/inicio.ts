import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent implements OnInit {
  empresa: any = { nombre: '', mensaje_principal: '', mision: '', vision: '' };
  cargando = true;
  isAdmin = false;
  mostrarModal = false;

  constructor(private empresaService: EmpresaService, private authService: AuthService) {}

  ngOnInit(): void {
    this.verificarAdmin();
    this.cargarDatos();
  }

  verificarAdmin() {
    const token = this.authService.getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.isAdmin = decoded.rol === 'admin';
      } catch {
        this.isAdmin = false;
      }
    }
  }

  cargarDatos() {
    this.empresaService.obtenerEmpresa().subscribe({
      next: (res) => {
        this.empresa = res;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar empresa:', err);
        this.cargando = false;
      }
    });
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarCambios(form: NgForm) {
    if (!form.valid) {
      alert('⚠️ Completa todos los campos antes de guardar.');
      return;
    }

    this.empresaService.actualizarEmpresa(this.empresa).subscribe({
      next: () => {
        alert('✅ Información actualizada correctamente.');
        this.mostrarModal = false;
      },
      error: (err) => {
        console.error('Error al actualizar empresa:', err);
        alert('❌ Error al guardar los cambios.');
      }
    });
  }
}
