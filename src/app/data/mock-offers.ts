import { Offer } from '../models/offer';

export const MOCK_OFFERS: Offer[] = [
  { id: 1, shopId: 1, cardId: 1, price: 89.95, stock: 2, condition: 'Near Mint', createdAt: '2026-11-18T10:00:00Z' },
  { id: 2, shopId: 1, cardId: 2, price: 24.5, stock: 3, condition: 'Mint', createdAt: '2026-11-18T10:05:00Z' },
  { id: 3, shopId: 1, cardId: 6, price: 0.8, stock: 10, condition: 'Excellent', createdAt: '2026-11-19T12:30:00Z' },
  { id: 4, shopId: 2, cardId: 1, price: 84, stock: 1, condition: 'Excellent', createdAt: '2026-11-20T17:15:00Z' },
  { id: 5, shopId: 2, cardId: 3, price: 15, stock: 4, condition: 'Near Mint', createdAt: '2026-11-20T17:20:00Z' },
  { id: 6, shopId: 2, cardId: 4, price: 6.5, stock: 5, condition: 'Good', createdAt: '2026-11-21T18:00:00Z' },
  { id: 7, shopId: 3, cardId: 5, price: 9.9, stock: 2, condition: 'Near Mint', createdAt: '2026-11-22T11:40:00Z' },
  { id: 8, shopId: 3, cardId: 2, price: 22, stock: 1, condition: 'Light Played', createdAt: '2026-11-22T11:45:00Z' },
];
