import { Component, OnInit, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { OfferService } from '../../../services/offer.service';
import { CardService } from '../../../services/card.service';
import { CardCondition, Offer } from '../../../models/offer';
import { Card } from '../../../models/card';
import { CurrencyPipe } from '@angular/common';

const SHOP_ID = 1;

@Component({
  selector: 'app-oferta-form',
  imports: [ReactiveFormsModule, RouterLink, HeaderComponent, CurrencyPipe],
  templateUrl: './oferta-form.component.html',
  styleUrl: './oferta-form.component.css'
})
export class OfertaFormComponent implements OnInit {
  private offerService = inject(OfferService);
  private cardService = inject(CardService);
  private router = inject(Router);

  id = input<string>();
  editId: number | undefined;
  private originalOffer: Offer | undefined;

  conditions: CardCondition[] = ['Mint', 'Near Mint', 'Excellent', 'Good', 'Light Played', 'Played', 'Poor'];
  cards: Card[] = [];
  searchText = '';
  errorMessage = '';

  offerForm = new FormGroup({
    cardId: new FormControl<number | null>(null, { validators: [Validators.required] }),
    price: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
    condition: new FormControl<CardCondition | ''>('', { nonNullable: true, validators: [Validators.required] }),
    stock: new FormControl(1, { nonNullable: true, validators: [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)] }),
  });

  ngOnInit(): void {
    this.cardService.getCards().subscribe(cards => {
      this.cards = cards;
    });

    const id = this.id();
    if (id) {
      this.editId = Number(id);
      this.offerService.getOffer(this.editId).subscribe(offer => {
        if (!offer) {
          this.errorMessage = 'Esta oferta no existe.';
          return;
        }
        this.originalOffer = offer;
        this.offerForm.patchValue(offer);
      });
    }
  }

  filteredCards(): Card[] {
    const text = this.searchText.trim().toLowerCase();
    if (!text) {
      return [];
    }
    return this.cards.filter(card => card.name.toLowerCase().includes(text));
  }

  selectedCard(): Card | undefined {
    return this.cards.find(card => card.id === this.offerForm.controls.cardId.value);
  }

  selectCard(card: Card): void {
    this.offerForm.controls.cardId.setValue(card.id);
    this.offerForm.controls.cardId.markAsTouched();
    this.searchText = '';
  }

  onSave(): void {
    this.offerForm.markAllAsTouched();

    if (this.offerForm.invalid) {
      return;
    }

    const { cardId, price, condition, stock } = this.offerForm.getRawValue();
    const data = { shopId: SHOP_ID, cardId: cardId as number, price, condition: condition as CardCondition, stock };

    const request = this.editId && this.originalOffer
      ? this.offerService.updateOffer({ ...this.originalOffer, ...data })
      : this.offerService.createOffer(data);

    request.subscribe({
      next: () => this.router.navigate(['/panel/ofertas']),
      error: () => this.errorMessage = 'No se pudo guardar la oferta. Revisa que la API esté arrancada.'
    });
  }
}
