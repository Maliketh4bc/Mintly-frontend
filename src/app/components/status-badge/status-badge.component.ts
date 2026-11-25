import { Component, input } from '@angular/core';
import { ReservationStatus } from '../../models/reservation';

@Component({
  selector: 'app-status-badge',
  imports: [],
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.css'
})
export class StatusBadgeComponent {
  status = input.required<ReservationStatus>();
}
