import { Component, inject, SimpleChange, SimpleChanges } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
import { products } from '../shared/interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { SearchPageCardComponent } from '../shared/components/search-page-card/search-page-card.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { CartService } from '../shared/services/cart.service';
import { AlertsServiceService } from '../shared/services/alerts-service.service';
import { PaginatorDropdownComponent } from '../shared/components/paginator-dropdown/paginator-dropdown.component';

@Component({
  selector: 'app-search-page',
  imports: [
    CommonModule,
    SearchPageCardComponent,
    ReactiveFormsModule,
    PaginatorDropdownComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  private readonly productsService = inject(ProductsService);
  private readonly routerSnap = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly alerts = inject(AlertsServiceService);

  products: products[] = [];
  panelItems: string[] = [];
  totalPages: number = 0;
  currentPage: number = 1;

  totalItems: number = 0;

  // default ად page ის ზომა იქნება 10
  // მაგრამ შემდეგ ჩანაცვლდება paginator-dropdown - ისგან
  // მოწოდებული რიცხვით
  save_page_size: number = 10;

  sortedBy: string = 'price';
  priceControl: number = 10000;
  searchQuery: string = '';
  userBrand: string = '';

  categoryForm = new FormGroup({
    brandFilter: new FormControl(this.userBrand, { nonNullable: true }),
    priceRange: new FormControl(this.priceControl, { nonNullable: true }),
    sortBy: new FormControl(this.sortedBy, { nonNullable: true }),
    sortDir: new FormControl('asc', { nonNullable: true }),
  });

  constructor() {
    // this.loadBrands();
    this.routerSnap.queryParams.subscribe((res) => {
      if (res['query']) {
        this.foundItems(res['query']);
        this.searchQuery = res['query'];
      }
    });
    this.trackFilers();
    this.getBrands();
  }

  // შესასწორებელია
  resetFilters() {
    this.categoryForm.reset();
    this.priceControl = 10000;
    this.categoryForm.controls.priceRange.setValue(this.priceControl);
  }

  // ვუსმენ მთლიან ფორმას თითო მნიშვნელობის შეცვლისას
  // იღებს value ებს destructure ით და გადასცემს ფუნქციას
  // საიდანაც უკვე ვიღებთ პროდუქტებს
  trackFilers() {
    this.categoryForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe((values) => {
        const { brandFilter, priceRange, sortBy, sortDir } = values;

        const filteredQuery = brandFilter || this.searchQuery;

        this.foundItems(
          filteredQuery,
          this.currentPage,
          priceRange,
          this.save_page_size,
          sortBy,
          sortDir
        );
      });
  }

  foundItems(
    querry: string,
    page_index: number = 1,
    page_size: number = this.save_page_size,
    price_max: number = this.priceControl,
    sort_by: string = 'price',
    sort_dir: string = 'asc'
  ) {
    this.productsService
      .searchProduct(
        querry,
        page_index,
        price_max,
        page_size,
        sort_by,
        sort_dir
      )
      .subscribe((res) => {
        this.products = res.products;
        this.currentPage = res.page;
        this.totalPages = Math.ceil(res.total / res.limit);
        this.totalItems = res.total;
      });
  }

  // ფეიჯზე დაჭერის handling
  handlePage(_page: number): void {
    if (_page === this.currentPage) {
      return;
    }
    this.currentPage = _page;
    this.foundItems(this.searchQuery, this.currentPage);
  }

  // შემდეგი გვერდი
  nextPage(_nextPage: number): void {
    if (this.currentPage === this.totalPages) return;
    this.currentPage = _nextPage;
    this.foundItems(this.searchQuery, this.currentPage);
  }

  // უკანა გვერდი
  previousPage(_prevPage: number): void {
    if (this.currentPage === 1) return;
    this.currentPage = _prevPage;
    this.foundItems(this.searchQuery, this.currentPage);
  }

  getBrands() {
    this.productsService.loadBrands().subscribe((res) => {
      this.panelItems = [...res];
    });
  }

  addToCart(_id: string, qty: number = 1) {
    this.cartService
      .createCart(_id, qty)
      .pipe(
        tap((res) => {
          if (res) {
            this.alerts.toast('Item Added to cart', 'success', '');
          }
        })
      )
      .subscribe();
  }

  // ფუნქციაში ახლდება page_size და თან ამოწმებს იმას რომ მომხმარებელი
  // არ იდგეს არარსებულ გვერდზე
  getPageSize(page_size: number) {
    this.save_page_size = page_size;

    // თუ მაგალითად ნივთების რაოდენობა გაყოფილი page_size ზე არის
    // ნაკლები ამჟამინდელი გვერდის ინდექსზე მაშინ currentPage ხდება 1
    // ანუ მომხმარებელი ბრუნდება საწყის გვერდზე რო არ იდგეს არარსებულ გვერდზე
    // სხვა შემთხევევაში რექევესტი გადის პირდაპირ
    if (this.totalItems / page_size < this.currentPage) {
      this.currentPage = 1;
      this.foundItems(this.searchQuery, this.currentPage, page_size);
    } else {
      this.foundItems(this.searchQuery, this.currentPage, page_size);
    }
  }
}
