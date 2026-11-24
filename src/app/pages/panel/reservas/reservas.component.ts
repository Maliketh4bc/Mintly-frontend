import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { StatusBadgeComponent } from '../../../components/status-badge/status-badge.component';
import { ReservationService } from '../../../services/reservation.service';
import { Reservation, ReservationStatus } from '../../../models/reservation';

type Filtro = ReservationStatus | 'todas';

interface OpcionFiltro {
  valor: Filtro;
  texto: string;
}

@Component({
  selector: 'app-reservas',
  imports: [HeaderComponent, StatusBadgeComponent, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent implements OnInit {
  private reservationService = inject(ReservationService);

  reservations: Reservation[] = [];
  loading = true;
  errorMessage = '';
  filtro: Filtro = 'todas';

  opciones: OpcionFiltro[] = [
    { valor: 'todas', texto: 'Todas' },
    { valor: 'activa', texto: 'Activas' },
    { valor: 'recogida', texto: 'Recogidas' },
    { valor: 'caducada', texto: 'Caducadas' },
    { valor: 'cancelada', texto: 'Canceladas' },
  ];

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe({
      next: reservations => {
        this.reservations = [...reservations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las reservas. Revisa que la API esté arrancada.';
        this.loading = false;
      }
    });
  }

  reservasFiltradas(): Reservation[] {
    if (this.filtro === 'todas') {
      return this.reservations;
    }
    return this.reservations.filter(r => r.status === this.filtro);
  }

  contar(valor: Filtro): number {
    if (valor === 'todas') {
      return this.reservations.length;
    }
    return this.reservations.filter(r => r.status === valor).length;
  }
}
