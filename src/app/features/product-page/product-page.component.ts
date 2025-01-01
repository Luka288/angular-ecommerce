import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaveItemsService } from '../shared/services/save-items.service';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private readonly actSnap = inject(ActivatedRoute);
  private readonly perviousProducts = inject(SaveItemsService);

  currentProduct: string | null = null;

  constructor() {
    this.actSnap.paramMap.subscribe((params) => {
      let product_id = params.get('id');
      this.loadProduct(product_id);

      this.perviousProducts.saveItems(product_id!);
    });
  }

  loadProduct(_id: string | null) {
    this.currentProduct = _id;
  }
}
