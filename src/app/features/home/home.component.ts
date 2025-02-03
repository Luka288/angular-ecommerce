import { Component, inject } from '@angular/core';
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
import { AlertsServiceService } from '../shared/services/alerts-service.service';
import { tap } from 'rxjs';
import { WishlistService } from '../shared/services/wishlist.service';
import _default from '@primeng/themes/aura';
import { ActivatedRoute } from '@angular/router';

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
  private readonly alerts = inject(AlertsServiceService);
  private readonly wishlistService = inject(WishlistService);

  //? რეზოლვერისთვის
  private readonly actSnap = inject(ActivatedRoute);

  products: products[] = [];
  brands: string[] = [];
  randomThree: products[] = [];
  thumbnails: thumbnailInterface[] = [];
  seenThree: products[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.everrestProducts.getProducts().subscribe((res) => {
      this.products = res;
    });

    //? ანელებს ფეიჯს
    // this.actSnap.data.subscribe((items) => {
    //   this.products = items['mainItemsResolver'];
    // });

    this.everrestProducts.brands$.subscribe((res) => {
      this.brands = res;
    });

    this.perviousProducts.getSavedItems().subscribe((res) => {
      this.seenItems(res);
    });

    this.loadRandomProducts();
  }

  loadRandomProducts() {
    this.everrestProducts.random$.subscribe((res) => {
      this.randomThree = res;
      this.loading = false;
    });
  }

  seenItems(ids: string[]) {
    ids.forEach((id) => {
      this.everrestProducts.productWithId(id).subscribe((res) => {
        this.seenThree.push(res);
      });
    });
  }

  updateCart(_id: string, qty: number = 1) {
    this.cartService.updateCart(_id, qty).subscribe((res) => {
      if (res) {
        this.alerts.toast('Item updated in cart', 'success', '');
      }
    });
  }

  sliderCart(_id: string, qty: number = 1) {
    this.cartService
      .createCart(_id, qty)
      .pipe(
        tap((res) => {
          if (res) {
            this.alerts.toast('Item added to cart', 'success', '');
          }
        })
      )
      .subscribe();
  }

  emitedItem(_id: string, qty: number = 1) {
    this.cartService
      .createCart(_id, qty)
      .pipe(
        tap((res) => {
          if (res) {
            this.alerts.toast('Item added to cart', 'success', '');
          }
        })
      )
      .subscribe();
  }

  wishlistedItems(_id: string) {
    this.wishlistService.saveItems(_id);
    this.alerts.toast('Item added to wishlist', 'success', '');
  }
}
