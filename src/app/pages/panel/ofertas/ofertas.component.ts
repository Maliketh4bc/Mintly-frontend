import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { OfferService } from '../../../services/offer.service';
import { ReservationService } from '../../../services/reservation.service';
import { Offer } from '../../../models/offer';

const SHOP_ID = 1;

@Component({
  selector: 'app-ofertas',
  imports: [HeaderComponent, RouterLink, CurrencyPipe],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent implements OnInit {
  private offerService = inject(OfferService);
  private reservationService = inject(ReservationService);

  offers: Offer[] = [];
  reservedByOffer: Record<number, number> = {};
  loading = true;
  errorMessage = '';
  confirmingId: number | null = null;

  ngOnInit(): void {
    this.offerService.getOffersByShop(SHOP_ID).subscribe({
      next: offers => {
        this.offers = [...offers].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las ofertas. Revisa que la API esté arrancada.';
        this.loading = false;
      }
    });

    this.reservationService.getReservations().subscribe(reservations => {
      for (const r of reservations) {
        if (r.status === 'activa') {
          this.reservedByOffer[r.offerId] = (this.reservedByOffer[r.offerId] ?? 0) + 1;
        }
      }
    });
  }

  reserved(offer: Offer): number {
    return this.reservedByOffer[offer.id] ?? 0;
  }

  askDelete(offer: Offer): void {
    this.confirmingId = offer.id;
  }

  cancelDelete(): void {
    this.confirmingId = null;
  }

  confirmDelete(offer: Offer): void {
    this.offerService.deleteOffer(offer.id).subscribe({
      next: () => {
        this.offers = this.offers.filter(o => o.id !== offer.id);
        this.confirmingId = null;
      },
      error: () => {
        this.errorMessage = 'No se pudo quitar la oferta.';
        this.confirmingId = null;
      }
    });
  }
}
