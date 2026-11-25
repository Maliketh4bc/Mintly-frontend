import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../../../components/header/header.component';
import { CardItemComponent } from '../../../components/card-item/card-item.component';
import { CardService } from '../../../services/card.service';
import { Card } from '../../../models/card';

@Component({
  selector: 'app-catalogo',
  imports: [HeaderComponent, CardItemComponent, ReactiveFormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {
  private cardService = inject(CardService);

  form = new FormGroup({
    busqueda: new FormControl('', { nonNullable: true }),
  });
  busquedaActual = '';

  cards: Card[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.cargar(this.cardService.getCards());
  }

  buscar(): void {
    const texto = this.form.controls.busqueda.value.trim();

    if (texto === '') {
      this.limpiar();
      return;
    }

    this.busquedaActual = texto;
    this.cargar(this.cardService.searchCards(texto));
  }

  limpiar(): void {
    this.form.reset();
    this.busquedaActual = '';
    this.cargar(this.cardService.getCards());
  }

  private cargar(peticion: Observable<Card[]>): void {
    this.loading = true;
    this.errorMessage = '';

    peticion.subscribe({
      next: cards => {
        this.cards = [...cards].sort((a, b) => a.name.localeCompare(b.name));
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar el catálogo. Inténtalo de nuevo más tarde.';
        this.cards = [];
        this.loading = false;
      }
    });
  }
}
