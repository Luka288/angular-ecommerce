import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  private readonly actSnap = inject(ActivatedRoute);

  currentProduct: string | null = null;

  constructor() {
    this.actSnap.paramMap.subscribe((params) => {
      let product_id = params.get('id');
      this.loadProduct(product_id);
    });
  }

  loadProduct(_id: string | null) {
    this.currentProduct = _id;
  }
}
