import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from '../models/card';
import { MOCK_CARDS } from '../data/mock-cards';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  getCards(): Observable<Card[]> {
    return of(MOCK_CARDS);
  }

  getCard(id: number): Observable<Card | undefined> {
    return of(MOCK_CARDS.find(card => card.id === id));
  }
}
