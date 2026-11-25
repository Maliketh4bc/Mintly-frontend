import { Component, OnInit, inject, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { CardService } from '../../services/card.service';
import { OfferService } from '../../services/offer.service';
import { ReservationService } from '../../services/reservation.service';
import { Card } from '../../models/card';
import { Offer } from '../../models/offer';

@Component({
  selector: 'app-card-detail',
  imports: [HeaderComponent, RouterLink, CurrencyPipe, DatePipe],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit {
  private cardService = inject(CardService);
  private offerService = inject(OfferService);
  private reservationService = inject(ReservationService);

  id = input.required<string>();

  card: Card | undefined;
  noEncontrada = false;
  offers: Offer[] = [];
  reservedByOffer: Record<number, number> = {};

  ngOnInit(): void {
    const id = Number(this.id());

    if (isNaN(id)) {
      this.noEncontrada = true;
      return;
    }

    this.cardService.getCard(id).subscribe(card => {
      this.card = card;
      this.noEncontrada = card === undefined;
    });

    this.offerService.getOffersByCard(id).subscribe(offers => {
      this.offers = [...offers].sort((a, b) => a.price - b.price);
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
