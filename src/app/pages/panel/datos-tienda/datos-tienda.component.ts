import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';
import { OfferService } from '../../../services/offer.service';
import { Shop } from '../../../models/shop';

const SHOP_ID = 1;

@Component({
  selector: 'app-datos-tienda',
  imports: [ReactiveFormsModule, HeaderComponent],
  templateUrl: './datos-tienda.component.html',
  styleUrl: './datos-tienda.component.css'
})
export class DatosTiendaComponent implements OnInit {
  private offerService = inject(OfferService);

  private originalShop: Shop | undefined;
  loading = true;
  saving = false;
  errorMessage = '';
  successMessage = '';

  shopForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(80)] }),
    address: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    city: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    openingHours: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\+?[0-9 .-]{9,15}$/)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  ngOnInit(): void {
    this.offerService.getShop(SHOP_ID).subscribe({
      next: shop => {
        this.loading = false;
        if (!shop) {
          this.errorMessage = 'No se han encontrado los datos de la tienda.';
          return;
        }
        this.originalShop = shop;
        this.shopForm.reset(shop);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'No se pudieron cargar los datos. Revisa que la API esté arrancada.';
      }
    });
  }

  onSave(): void {
    this.shopForm.markAllAsTouched();
    this.successMessage = '';
    this.errorMessage = '';

    if (this.shopForm.invalid) {
      return;
    }

    this.saving = true;
    this.offerService.updateShop(SHOP_ID, this.shopForm.getRawValue()).subscribe({
      next: shop => {
        this.saving = false;
        this.originalShop = shop;
        this.shopForm.reset(shop);
        this.successMessage = 'Datos guardados.';
      },
      error: () => {
        this.saving = false;
        this.errorMessage = 'No se pudieron guardar los datos. Revisa que la API esté arrancada.';
      }
    });
  }

  onDiscard(): void {
    if (this.originalShop) {
      this.shopForm.reset(this.originalShop);
    }
    this.successMessage = '';
  }
}
