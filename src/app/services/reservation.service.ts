import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/reservations';

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  getReservationByCode(code: string): Observable<Reservation | undefined> {
    return this.http.get<Reservation[]>(`${this.apiUrl}?code=${code}`).pipe(
      map(reservations => reservations[0])
    );
  }

  confirmPickup(id: number): Observable<Reservation> {
    return this.http.patch<Reservation>(`${this.apiUrl}/${id}`, {
      status: 'recogida',
      pickedUpAt: new Date().toISOString()
    });
  }
}
