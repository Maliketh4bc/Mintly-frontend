import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/cards';

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  getCard(id: number): Observable<Card | undefined> {
    const params = new HttpParams().set('id', id);
    return this.http.get<Card[]>(this.apiUrl, { params }).pipe(map(cards => cards[0]));
  }
}
