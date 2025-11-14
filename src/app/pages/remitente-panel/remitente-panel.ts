import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-remitente-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './remitente-panel.html',
  styleUrls: ['./remitente-panel.css']
})
export class RemitentePanelComponent {

  constructor(private router: Router) {}

  irCrearEnvio() {
    this.router.navigate(['/remitente/crear-envio']);
  }

  irMisEnvios() {
    this.router.navigate(['/remitente/mis-envios']);
  }
}
