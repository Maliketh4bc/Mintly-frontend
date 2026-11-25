import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface EnlacePanel {
  ruta: string;
  texto: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  enlaces: EnlacePanel[] = [
    { ruta: '/panel/resumen', texto: 'Resumen' },
    { ruta: '/panel/ofertas', texto: 'Mis ofertas' },
    { ruta: '/panel/reservas', texto: 'Reservas' },
    { ruta: '/panel/recogida', texto: 'Confirmar recogida' },
    { ruta: '/panel/tienda', texto: 'Datos de la tienda' },
  ];
}
