import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionItem } from '../models/collection-item';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/collection';

  getCollection(): Observable<CollectionItem[]> {
    const params = new HttpParams()
      .set('_expand', 'card')
      .set('_sort', 'addedAt')
      .set('_order', 'desc');
    return this.http.get<CollectionItem[]>(this.apiUrl, { params });
  }
}