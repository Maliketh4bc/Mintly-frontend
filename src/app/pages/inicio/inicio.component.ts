import { Component, OnInit, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { CardItemComponent } from '../../components/card-item/card-item.component';
import { CardService } from '../../services/card.service';
import { CollectionService } from '../../services/collection.service';
import { Card } from '../../models/card';
import { CollectionCondition, CollectionItem } from '../../models/collection-item';

interface Oferta {
  id: number;
  setName: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-inicio',
  imports: [HeaderComponent, CardItemComponent, CurrencyPipe, RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  private cardService = inject(CardService);
  private collectionService = inject(CollectionService);

  cards: Card[] = [];
  collection: CollectionItem[] = [];

  conditionLabels: Record<CollectionCondition, string> = {
    MINT: 'Mint',
    NEAR_MINT: 'Near Mint',
    EXCELLENT: 'Excellent',
    GOOD: 'Good',
    PLAYED: 'Played',
    POOR: 'Poor',
  };

  ofertas: Oferta[] = [
    { id: 1, setName: 'Obsidian Flames', name: 'Sobre limitado', price: 42.9 },
    { id: 2, setName: 'Pokémon 151', name: 'Caja Metálica', price: 24.5 },
    { id: 3, setName: 'Paldean Fates', name: 'Carta Gardevoir ex', price: 18.9 },
    { id: 4, setName: 'Evolving Skies', name: 'Caja 24 sobres', price: 36 },
    { id: 5, setName: 'Escarlata y Púrpura', name: 'Sobre 10 cartas', price: 4.99 },
    { id: 6, setName: 'Pokémon 151', name: 'Caja élite entrenador', price: 59.9 },
    { id: 7, setName: 'Evolving Skies', name: 'Blíster 3 sobres', price: 16.5 },
    { id: 8, setName: 'Obsidian Flames', name: 'Caja 36 sobres', price: 149 },
  ];

  ngOnInit(): void {
    this.collectionService.getCollection().subscribe(items => {
      this.collection = items;
    });

    this.cardService.getCards().subscribe(cards => {
      this.cards = cards;
    });
  }

  totalCards(): number {
    return this.collection.reduce((total, item) => total + item.quantity, 0);
  }

  totalValue(): number {
    return this.collection.reduce(
      (total, item) => total + (item.card?.marketPrice ?? 0) * item.quantity,
      0
    );
  }
}
