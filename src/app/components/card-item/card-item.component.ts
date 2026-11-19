import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-item',
  imports: [RouterLink],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.css'
})
export class CardItemComponent {
  card = input.required<Card>();
}
