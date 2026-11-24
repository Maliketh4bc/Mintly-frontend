import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { OfferService } from '../../../services/offer.service';
import { Shop } from '../../../models/shop';

@Component({
  selector: 'app-tiendas',
  imports: [HeaderComponent, RouterLink],
  templateUrl: './tiendas.component.html',
  styleUrl: './tiendas.component.css'
})
export class TiendasComponent implements OnInit {
  private offerService = inject(OfferService);

  shops: Shop[] = [];
  offersByShop: Record<number, number> = {};
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.offerService.getShops().subscribe({
      next: shops => {
        this.shops = [...shops].sort((a, b) => a.name.localeCompare(b.name));
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudieron cargar las tiendas. Inténtalo de nuevo más tarde.';
        this.loading = false;
      }
    });

    this.offerService.getOffers().subscribe(offers => {
      for (const offer of offers) {
        if (offer.stock > 0) {
          this.offersByShop[offer.shopId] = (this.offersByShop[offer.shopId] ?? 0) + 1;
        }
      }
    });
  }

  offerCount(shop: Shop): number {
    return this.offersByShop[shop.id] ?? 0;
  }
}
