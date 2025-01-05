import { Component, inject } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  private readonly router = inject(Router);
  private readonly routerSnap = inject(ActivatedRoute);

  products: products[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  searchQuerry: string = '';

  constructor() {
    this.routerSnap.queryParams.subscribe((res) => {
      if (res['query']) {
        this.foundItems(res['query']);
        this.searchQuerry = res['query'];
      }
    });
  }

  foundItems(querry: string, page_index: number = 1) {
    this.productsService.searchProduct(querry, page_index).subscribe((res) => {
      this.products = res.products;
      this.totalPages = Math.floor(res.total / res.limit);
      this.currentPage = res.page;
    });
  }

  // ფეიჯზე დაჭერის handling
  handlePage(_page: number): void {
    this.currentPage = _page;
    this.foundItems(this.searchQuerry, this.currentPage);
  }

  // შემდეგი გვერდი
  nextPage(_nextPage: number): void {
    if (this.currentPage === this.totalPages) return;
    this.currentPage = _nextPage;
    this.foundItems(this.searchQuerry, this.currentPage);
  }

  // უკანა გვერდი
  previousPage(_prevPage: number): void {
    if (this.currentPage === 1) return;
    this.currentPage = _prevPage;
    this.foundItems(this.searchQuerry, this.currentPage);
  }
}
