import { Component, OnInit, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { OfferService } from '../../../services/offer.service';
import { ReservationService } from '../../../services/reservation.service';
import { Shop } from '../../../models/shop';
import { Offer } from '../../../models/offer';

@Component({
  selector: 'app-tienda-detail',
  imports: [HeaderComponent, RouterLink, CurrencyPipe],
  templateUrl: './tienda-detail.component.html',
  styleUrl: './tienda-detail.component.css'
})
export class TiendaDetailComponent implements OnInit {
  private offerService = inject(OfferService);
  private reservationService = inject(ReservationService);

  id = input.required<string>();

  shop: Shop | undefined;
  noEncontrada = false;
  offers: Offer[] = [];
  reservedByOffer: Record<number, number> = {};

  ngOnInit(): void {
    const id = Number(this.id());

    if (isNaN(id)) {
      this.noEncontrada = true;
      return;
    }

    this.offerService.getShop(id).subscribe(shop => {
      this.shop = shop;
      this.noEncontrada = shop === undefined;
    });

    this.offerService.getOffersByShop(id).subscribe(offers => {
      this.offers = [...offers].sort((a, b) => (a.card?.name ?? '').localeCompare(b.card?.name ?? ''));
    });

    this.reservationService.getReservations().subscribe(reservations => {
      for (const r of reservations) {
        if (r.status === 'activa') {
          this.reservedByOffer[r.offerId] = (this.reservedByOffer[r.offerId] ?? 0) + 1;
        }
      }
    });
  }

  available(offer: Offer): number {
    return Math.max(offer.stock - (this.reservedByOffer[offer.id] ?? 0), 0);
  }

  availableOffers(): Offer[] {
    return this.offers.filter(offer => this.available(offer) > 0);
  }
}
