import { Routes } from '@angular/router';

// ==========================
// PÁGINAS PRINCIPALES
// ==========================
import { InicioComponent } from './pages/inicio/inicio';
import { NoticiasComponent } from './pages/noticias/noticias';
import { RastreoComponent } from './pages/rastreo/rastreo';
import { ContactoComponent } from './pages/contacto/contacto';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [

  // ==========================
  // PÚBLICAS
  // ==========================
  { path: '', component: InicioComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'rastreo', component: RastreoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },

  // ==========================
  // REGISTRO DE REMITENTE
  // ==========================
  {
  path: 'registro-remitente',
  loadComponent: () =>
    import('./pages/remitente-register/remitente-register')
      .then(m => m.RemitenteRegisterComponent)
},



  // ==========================
  // PANEL DEL REMITENTE
  // ==========================
  {
    path: 'remitente/panel',
    loadComponent: () =>
      import('./pages/remitente-panel/remitente-panel')
        .then(m => m.RemitentePanelComponent)
  },

  // ==========================
  // CREAR ENVÍO (REM)
  // ==========================
  {
    path: 'remitente/crear-envio',
    loadComponent: () =>
      import('./pages/remitente/crear-envio/crear-envio')
        .then(m => m.CrearEnvioComponent)
  },

  // ==========================
  // 404
  // ==========================
  { path: '**', redirectTo: '' }
];
