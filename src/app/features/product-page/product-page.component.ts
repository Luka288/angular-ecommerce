import {
  Component,
  inject,
  numberAttribute,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SaveItemsService } from '../shared/services/save-items.service';
import { ProductsService } from '../shared/services/products.service';
import { single_item } from '../shared/interfaces/product.interface';
import {
  single_thumbnail,
  thumbnailInterface,
} from '../shared/interfaces/slider.interface';
import { GalleriaModule } from 'primeng/galleria';
import { responsiveOptions } from '../shared/consts/consts';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../shared/components/select/select.component';
import { TransformCurrencyPipe } from '../shared/pipes/transform-currency.pipe';

@Component({
  selector: 'app-product-page',
  imports: [
    GalleriaModule,
    CommonModule,
    RouterModule,
    SelectComponent,
    TransformCurrencyPipe,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private readonly actSnap = inject(ActivatedRoute);
  private readonly perviousProducts = inject(SaveItemsService);
  private readonly everest = inject(ProductsService);
  private readonly router = inject(Router);

  singleItem: single_item | null = null;
  currentProductLib: thumbnailInterface[] = [];
  singleThumbnail: single_thumbnail[] = [];
  arrayOfStock!: number;

  selectedQuantity: number = 1;

  responsiveOptions = responsiveOptions;

  constructor() {
    this.actSnap.paramMap.subscribe((params) => {
      let product_id = params.get('id');

      this.perviousProducts.saveItems(product_id!);
      this.loadSingle(product_id!);
    });
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
    this.selectedQuantity = qty;
  }

  // in progress

  addToCart(_id: string, qty: number) {
    // card ზე დასამატებელი ინფორმაცია
    console.log({ product_id: _id, quantity: qty });
  }

  addToWishlist(_id: string) {
    // wishlist ისთვის უბრალოდ _id
    console.log(_id);
  }
}
