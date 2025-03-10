import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { products } from '../shared/interfaces/product.interface';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { CardComponent } from '../shared/components/card/card.component';
import { GaleriaComponent } from '../shared/components/galeria/galeria.component';
import { thumbnailInterface } from '../shared/interfaces/slider.interface';
import { SaveItemsService } from '../shared/services/save-items.service';
import { LoadingComponentComponent } from '../shared/components/loading-component/loading-component.component';
import { CartService } from '../shared/services/cart.service';
import { WishlistService } from '../shared/services/wishlist.service';
import _default from '@primeng/themes/aura';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    CarouselModule,
    SliderComponent,
    CardComponent,
    GaleriaComponent,
    LoadingComponentComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly everrestProducts = inject(ProductsService);
  private readonly perviousProducts = inject(SaveItemsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  products = toSignal(this.everrestProducts.getProducts(), {
    initialValue: [],
  });
  brands = toSignal(this.everrestProducts.brands$, { initialValue: [] });
  randomThree = toSignal(this.everrestProducts.random$, {
    initialValue: [],
  });

  seenThree: products[] = [];
  loading = signal<boolean>(true);

  thumbnails: thumbnailInterface[] = [];

  ngOnInit(): void {
    this.everrestProducts
      .getProducts()
      .subscribe(() => this.loading.set(false));

    this.perviousProducts.productsStream.subscribe(
      (res) => (this.seenThree = res)
    );
  }

  updateCart(_id: string, qty: number = 1) {
    this.cartService.updateCart(_id, qty).subscribe();
  }

  sliderCart(_id: string, qty: number = 1) {
    this.cartService.createCart(_id, qty).subscribe();
  }

  emitedItem(_id: string, qty: number = 1) {
    this.cartService.createCart(_id, qty).subscribe();
  }

  wishlistedItems(_id: string) {
    this.wishlistService.saveItems(_id);
  }
}
