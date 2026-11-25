import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { ReservationService } from '../../../services/reservation.service';
import { OfferService } from '../../../services/offer.service';
import { Reservation } from '../../../models/reservation';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

const SHOP_ID = 1;

@Component({
  selector: 'app-resumen',
  imports: [HeaderComponent, CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './resumen.component.html',
  styleUrl: './resumen.component.css'
})
export class ResumenComponent {
  private reservationService = inject(ReservationService);
  private offerService = inject(OfferService);

  pendingCount = 0;
  activeOffersCount = 0;
  weeklyPickupsCount = 0;
  latestReservations: Reservation[] = [];

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(reservations => {
      this.pendingCount = reservations.filter(r => r.status === 'activa').length;

      const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      this.weeklyPickupsCount = reservations.filter(r =>
        r.status === 'recogida' && r.pickedUpAt !== null && new Date(r.pickedUpAt).getTime() >= weekAgo
      ).length;

      this.latestReservations = [...reservations]
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 5);
    });

    this.offerService.getOffersByShop(SHOP_ID).subscribe(offers => {
      this.activeOffersCount = offers.filter(o => o.stock > 0).length;
    });
  }
}
