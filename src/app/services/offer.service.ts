import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Shop } from '../models/shop';
import { CardCondition, Offer } from '../models/offer';
import { MOCK_SHOPS } from '../data/mock-shops';
import { MOCK_OFFERS } from '../data/mock-offers';
import { MOCK_CARDS } from '../data/mock-cards';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  private shops: Shop[] = [...MOCK_SHOPS];
  private offers: Offer[] = [...MOCK_OFFERS];

  getShops(): Observable<Shop[]> {
    return of(this.shops);
  }

  getShop(id: number): Observable<Shop | undefined> {
    return of(this.shops.find(shop => shop.id === id));
  }

  getOffers(): Observable<Offer[]> {
    return of(this.offers);
  }

  getOffer(id: number): Observable<Offer | undefined> {
    return of(this.offers.find(offer => offer.id === id));
  }

  getOffersByShop(shopId: number): Observable<Offer[]> {
    return of(this.offers.filter(offer => offer.shopId === shopId));
  }

  getOffersByCard(cardId: number): Observable<Offer[]> {
    return of(this.offers.filter(offer => offer.cardId === cardId));
  }

  searchByName(name: string): Observable<Offer[]> {
    const text = name.trim().toLowerCase();
    return of(this.offers.filter(offer => {
      const card = MOCK_CARDS.find(c => c.id === offer.cardId);
      return card !== undefined && card.name.toLowerCase().includes(text);
    }));
  }

  filterByCondition(condition: CardCondition): Observable<Offer[]> {
    return of(this.offers.filter(offer => offer.condition === condition));
  }

  createOffer(offer: Omit<Offer, 'id' | 'createdAt'>): Observable<Offer> {
    const nextId = Math.max(0, ...this.offers.map(o => o.id)) + 1;
    const newOffer: Offer = { ...offer, id: nextId, createdAt: new Date().toISOString() };
    this.offers.push(newOffer);
    return of(newOffer);
  }

  updateOffer(offer: Offer): Observable<Offer> {
    this.offers = this.offers.map(o => o.id === offer.id ? offer : o);
    return of(offer);
  }

  deleteOffer(id: number): Observable<boolean> {
    const before = this.offers.length;
    this.offers = this.offers.filter(o => o.id !== id);
    return of(this.offers.length < before);
  }
}
