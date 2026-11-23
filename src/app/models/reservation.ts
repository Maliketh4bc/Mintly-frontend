export type ReservationStatus = 'activa' | 'recogida' | 'caducada' | 'cancelada';

export interface Reservation {
  id: number;
  code: string;
  customerName: string;
  offerId: number;
  cardName: string;
  cardImage: string;
  price: number;
  createdAt: string;
  expiresAt: string;
  status: ReservationStatus;
}
