import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [
    {
      id: 1, code: 'MNT-4F7K', customerName: 'Lucía Romero', offerId: 1,
      cardName: 'Charizard', cardImage: 'https://assets.tcgdex.net/en/base/base1/4/high.png',
      price: 320, createdAt: '2026-11-23T09:15:00Z', expiresAt: '2026-11-25T09:15:00Z', status: 'activa'
    },
    {
      id: 2, code: 'MNT-9QZ2', customerName: 'Javier Molina', offerId: 2,
      cardName: 'Pikachu', cardImage: 'https://assets.tcgdex.net/en/base/base1/58/high.png',
      price: 12.5, createdAt: '2026-11-22T17:40:00Z', expiresAt: '2026-11-24T17:40:00Z', status: 'activa'
    },
    {
      id: 3, code: 'MNT-2HD8', customerName: 'Marta Ruiz', offerId: 3,
      cardName: 'Blastoise', cardImage: 'https://assets.tcgdex.net/en/base/base1/2/high.png',
      price: 145, createdAt: '2026-11-21T11:05:00Z', expiresAt: '2026-11-23T11:05:00Z', status: 'recogida'
    },
    {
      id: 4, code: 'MNT-7LP3', customerName: 'Daniel Ortega', offerId: 4,
      cardName: 'Mewtwo', cardImage: 'https://assets.tcgdex.net/en/base/base1/10/high.png',
      price: 60, createdAt: '2026-11-19T10:00:00Z', expiresAt: '2026-11-21T10:00:00Z', status: 'caducada'
    },
    {
      id: 5, code: 'MNT-5WX9', customerName: 'Sara Delgado', offerId: 5,
      cardName: 'Venusaur', cardImage: 'https://assets.tcgdex.net/en/base/base1/15/high.png',
      price: 110, createdAt: '2026-11-20T16:30:00Z', expiresAt: '2026-11-22T16:30:00Z', status: 'cancelada'
    },
    {
      id: 6, code: 'MNT-8RT6', customerName: 'Pablo Navas', offerId: 6,
      cardName: 'Gyarados', cardImage: 'https://assets.tcgdex.net/en/base/base1/6/high.png',
      price: 45, createdAt: '2026-11-23T08:20:00Z', expiresAt: '2026-11-25T08:20:00Z', status: 'activa'
    }
  ];

  getReservations(): Observable<Reservation[]> {
    return of(this.reservations);
  }

  getReservationByCode(code: string): Observable<Reservation | undefined> {
    return of(this.reservations.find(r => r.code === code));
  }

  confirmPickup(id: number): Observable<Reservation | undefined> {
    const reservation = this.reservations.find(r => r.id === id);

    if (reservation && reservation.status === 'activa') {
      reservation.status = 'recogida';
    }

    return of(reservation);
  }
}
