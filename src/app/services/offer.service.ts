import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Shop } from '../models/shop';
import { CardCondition, Offer } from '../models/offer';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private http = inject(HttpClient);
  private shopsUrl = 'http://localhost:3000/shops';
  private apiUrl = 'http://localhost:3000/offers';

  // tiendas
  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.shopsUrl);
  }

  getShop(id: number): Observable<Shop | undefined> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Shop[]>(this.shopsUrl, { params }).pipe(map(shops => shops[0]));
  }

  // listar y buscar ofertas
  getOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.apiUrl);
  }

  getOffer(id: number): Observable<Offer | undefined> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Offer[]>(this.apiUrl, { params }).pipe(map(offers => offers[0]));
  }

  getOffersByShop(shopId: number): Observable<Offer[]> {
    const params = new HttpParams().set('shopId', shopId);
    return this.http.get<Offer[]>(this.apiUrl, { params });
  }

  getOffersByCard(cardId: number): Observable<Offer[]> {
    const params = new HttpParams().set('cardId', cardId);
    return this.http.get<Offer[]>(this.apiUrl, { params });
  }

  searchByName(name: string): Observable<Offer[]> {
    const text = name.trim().toLowerCase();
    const params = new HttpParams().set('_expand', 'card');
    return this.http.get<Offer[]>(this.apiUrl, { params }).pipe(
      map(offers => offers.filter(o => o.card?.name.toLowerCase().includes(text)))
    );
  }

  filterByCondition(condition: CardCondition): Observable<Offer[]> {
    const params = new HttpParams().set('condition', condition);
    return this.http.get<Offer[]>(this.apiUrl, { params });
  }

  // crear, editar y quitar
  createOffer(offer: Omit<Offer, 'id' | 'createdAt'>): Observable<Offer> {
    return this.http.post<Offer>(this.apiUrl, { ...offer, createdAt: new Date().toISOString() });
  }

  updateOffer(offer: Offer): Observable<Offer> {
    const { card, ...data } = offer;
    return this.http.patch<Offer>(`${this.apiUrl}/${offer.id}`, data);
  }

  deleteOffer(id: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(map(() => true));
  }
}
