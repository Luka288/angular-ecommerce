import { Component, inject } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { products } from '../shared/interfaces/product.interface';
import { CommonModule, JsonPipe } from '@angular/common';
import { CardComponent } from '../shared/components/card/card.component';

@Component({
  selector: 'app-search-page',
  imports: [CommonModule, CardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  private readonly productsService = inject(ProductsService);
  private readonly routerSnap = inject(ActivatedRoute);

  products: products[] = [];

  constructor() {
    this.routerSnap.queryParams.subscribe((res) => {
      if (res['query']) {
        this.foundItems(res['query']);
      }
    });
  }

  foundItems(querry: string) {
    this.productsService.searchProduct(querry).subscribe((res) => {
      this.products = res.products;
      console.log(this.products);
    });
  }
}
