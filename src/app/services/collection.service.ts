import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CollectionItem } from '../models/collection-item';
import { JSON_SERVER_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private http = inject(HttpClient);
  private apiUrl = `${JSON_SERVER_URL}/collection`;

  getCollection(): Observable<CollectionItem[]> {
    const params = new HttpParams()
      .set('_expand', 'card')
      .set('_sort', 'addedAt')
      .set('_order', 'desc');
    return this.http.get<CollectionItem[]>(this.apiUrl, { params });
  }
}
