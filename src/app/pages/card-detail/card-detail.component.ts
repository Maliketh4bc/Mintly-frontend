import { Component, OnInit, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-detail',
  imports: [HeaderComponent, RouterLink, CurrencyPipe],
  templateUrl: './card-detail.component.html',
  styleUrl: './card-detail.component.css'
})
export class CardDetailComponent implements OnInit {
  private cardService = inject(CardService);

  id = input.required<string>();

  card: Card | undefined;
  noEncontrada = false;

  ngOnInit(): void {
    const id = Number(this.id());

    if (isNaN(id)) {
      this.noEncontrada = true;
      return;
    }

    this.cardService.getCard(id).subscribe(card => {
      this.card = card;
      this.noEncontrada = card === undefined;
    });
  }
}
