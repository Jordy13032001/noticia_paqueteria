import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiasService, Noticia } from '../../services/noticias.service';
import { AuthService } from '../../services/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './noticias.html',
  styleUrls: ['./noticias.css']
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  esAdmin: boolean = false;

  nuevaNoticia: Partial<Noticia> = {
    titulo: '',
    descripcion: '',
    url_imagen: ''
  };

  constructor(
    private noticiasService: NoticiasService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.verificarRolAdmin();
    this.cargarNoticias();
  }

  verificarRolAdmin() {
    if (typeof window === 'undefined') return;
    const token = this.authService.getToken();
    if (!token) {
      this.esAdmin = false;
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      this.esAdmin = decoded.rol === 'admin';
    } catch (error) {
      this.esAdmin = false;
    }
  }

  cargarNoticias() {
    this.noticiasService.listar().subscribe({
      next: (data) => (this.noticias = data),
      error: (err) => console.error('Error al cargar noticias:', err)
    });
  }

  agregarNoticia() {
    if (!this.nuevaNoticia.titulo || !this.nuevaNoticia.descripcion) return;

    this.noticiasService.crear(this.nuevaNoticia).subscribe({
      next: (res) => {
        this.noticias.push(res);
        this.nuevaNoticia = { titulo: '', descripcion: '', url_imagen: '' };
      },
      error: (err) => console.error('Error al agregar noticia:', err)
    });
  }

  eliminarNoticia(id: number) {
    if (!confirm('¿Seguro que deseas eliminar esta noticia?')) return;

    this.noticiasService.eliminar(id).subscribe({
      next: () => {
        this.noticias = this.noticias.filter((n) => n.id_noticia !== id);
      },
      error: (err) => console.error('Error al eliminar noticia:', err)
    });
  }
}
