import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-product-page',
  imports: [GalleriaModule, CommonModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private readonly actSnap = inject(ActivatedRoute);
  private readonly perviousProducts = inject(SaveItemsService);
  private readonly everest = inject(ProductsService);
  private readonly router = inject(ActivatedRoute);

  singleItem: single_item | null = null;
  currentProductLib: thumbnailInterface[] = [];
  singleThumbnail: single_thumbnail[] = [];

  responsiveOptions = responsiveOptions;

  constructor() {
    this.actSnap.paramMap.subscribe((params) => {
      let product_id = params.get('id');
      console.log(params);

      this.perviousProducts.saveItems(product_id!);
      this.loadSingle(product_id!);
    });

    console.log('init');
  }

  loadSingle(_id: string) {
    this.router.data.subscribe((res) => {
      this.singleItem = res['singleItem_resolve'];
      console.log(res['singleItem_resolve']);
      this.singleItem?.images.forEach((image) => {
        this.currentProductLib.push({
          thumbnailImageSrc: image,
        });
      });

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
}
