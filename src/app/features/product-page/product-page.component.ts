import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SaveItemsService } from '../shared/services/save-items.service';
import { ProductsService } from '../shared/services/products.service';
import { products, single_item } from '../shared/interfaces/product.interface';
import {
  single_thumbnail,
  thumbnailInterface,
} from '../shared/interfaces/slider.interface';
import { GalleriaModule } from 'primeng/galleria';
import { galeriaResponsive } from '../shared/consts/consts';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../shared/components/select/select.component';
import { TransformCurrencyPipe } from '../shared/pipes/transform-currency.pipe';
import { AuthService } from '../shared/services/auth.service';
import { CartService } from '../shared/services/cart.service';
import { catchError, map, take, tap } from 'rxjs';
import { AlertsServiceService } from '../shared/services/alerts-service.service';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { WishlistService } from '../shared/services/wishlist.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-page',
  imports: [
    GalleriaModule,
    CommonModule,
    RouterModule,
    SelectComponent,
    TransformCurrencyPipe,
    SliderComponent,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private readonly actSnap = inject(ActivatedRoute);
  private readonly perviousProducts = inject(SaveItemsService);
  private readonly everest = inject(ProductsService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly alert = inject(AlertsServiceService);
  private readonly wishlistService = inject(WishlistService);

  singleItem: single_item | null = null;
  currentProductLib: thumbnailInterface[] = [];
  singleThumbnail: single_thumbnail[] = [];
  arrayOfStock!: number;
  categoryItems = signal<products[]>([]);

  selectedQuantity = signal(1);

  currentCategory = toSignal(
    this.actSnap.data.pipe(map((res) => res['singleItem_resolve'].category.id))
  );

  responsiveOptions = galeriaResponsive;

  constructor() {}

  ngOnInit(): void {
    this.actSnap.paramMap.subscribe((params) => {
      let product_id = params.get('id');

      this.perviousProducts.saveItems(product_id!);
      this.loadSingle(product_id!);
    });
    this.getSimilarItems();
  }

  loadSingle(_id: string) {
    this.actSnap.data.subscribe((res) => {
      // ? ავტომატურად არ ცარიელდება
      this.currentProductLib = [];
      this.singleThumbnail = [];

      this.singleItem = res['singleItem_resolve'];

      this.singleItem?.images.forEach((image) => {
        this.currentProductLib.push({
          thumbnailImageSrc: image,
        });
      });
      // იღებს რესპონსიდან მხოლოდ სტოკს
      this.arrayOfStock = res['singleItem_resolve'].stock;

      this.singleThumbnail = [
        {
          thumbnailImageSrc: this.singleItem!.thumbnail,
        },
      ];
    });
  }

  calcRating(rating?: number): { full: number; half: number } {
    const full = Math.floor(rating!);
    const half = rating! % 1 >= 0.5 ? 1 : 0;
    return { full, half };
  }

  verifyUser(): boolean {
    return this.authService.checkUser();
  }

  // გადაყავს მომხმარებელი სერჩის ფეიჯზე სადაც არის
  // მხოლო კონკრეტული ბრენიდს პროდუქცია
  navigateToSearch(_brand: string) {
    this.router.navigate(['/search'], {
      queryParams: { query: _brand },
    });
    this.everest.searchProduct(_brand);
  }

  // იჭერს იუზერის არჩეულ რაოდენობას
  catchQty(qty: number) {
    this.selectedQuantity.set(qty);
  }

  addToCart(_id: string, qty: number) {
    this.cartService.createCart(_id, qty)!.subscribe();
  }

  addToWishlist(_id: string) {
    this.wishlistService.saveItems(_id);
  }

  getSimilarItems(_categoryId: string = this.currentCategory()) {
    this.everest
      .getCategory(_categoryId)
      .pipe(take(1))
      .subscribe((res) => {
        this.categoryItems.set(res.products);
      });
  }

  emitedItemId(_id: string, qty: number = this.selectedQuantity()) {
    this.addToCart(_id, qty);
  }

  wishlist(_id: string) {
    this.wishlistService.saveItems(_id);
  }
}
