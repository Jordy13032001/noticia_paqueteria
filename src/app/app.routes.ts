import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio';
import { NoticiasComponent } from './pages/noticias/noticias';
import { RastreoComponent } from './pages/rastreo/rastreo';
import { ContactoComponent } from './pages/contacto/contacto';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'rastreo', component: RastreoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent }, // 👈 nuevo
  { path: '**', redirectTo: '' }
];
