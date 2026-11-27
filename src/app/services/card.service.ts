import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Card } from '../models/card';
import { JSON_SERVER_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private http = inject(HttpClient);
  private apiUrl = `${JSON_SERVER_URL}/cards`;

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  searchCards(text: string): Observable<Card[]> {
    const escaped = text.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const params = new HttpParams().set('name_like', escaped);
    return this.http.get<Card[]>(this.apiUrl, { params });
  }


  getCard(id: number): Observable<Card | undefined> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Card[]>(this.apiUrl, { params }).pipe(map(cards => cards[0]));
  }
}
