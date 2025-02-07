import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import {
  base_products,
  products,
  single_item,
} from '../interfaces/product.interface';
import { API_URL } from '../consts/consts';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { BrandNames } from '../interfaces/brands.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  constructor(@Inject(API_URL) private API: string) {}

  private brandsSubject = new BehaviorSubject<string[]>([]);
  brands$ = this.brandsSubject.asObservable();

  private randomItems = new BehaviorSubject<products[]>([]);
  random$ = this.randomItems.asObservable();

  getProducts() {
    return this.http
      .get<base_products>(`${this.API}/shop/products/all?page_size=50`)
      .pipe(
        tap((res) => {
          const brands = res.products
            .map((product) => product.brand)
            .filter((value, index, self) => self.indexOf(value) === index)
            .filter(
              (brand) =>
                res.products.filter((product) => product.brand === brand)
                  .length >= 3
            );

          // მხოლოდ ბრენდების სახელი
          this.brandsSubject.next(brands);

          // რენდომული 3 აითემი
          this.randomItems.next(
            res.products.sort(() => Math.random() - 0.5).slice(0, 3)
          );
        }),
        map((res) => res.products)
      );
  }

  searchProducts(query?: string) {
    return this.http
      .get<base_products>(
        `${this.API}/shop/products/search?keywords=${query}&page_size=50`
      )
      .pipe(map((res) => res.products));
  }

  productWithId(id: string) {
    return this.http.get<products>(`${this.API}/shop/products/id/${id}`);
  }

  singleItem(_id: string) {
    return this.http.get<single_item>(`${this.API}/shop/products/id/${_id}`);
  }

  searchProduct(
    _querry: string,
    page_index: number = 1,
    price_max: number = 10000,
    page_size: number = 10,
    sort_by: string = 'price',
    sort_dir: string = 'asc'
  ) {
    return this.http.get<base_products>(
      `${this.API}/shop/products/search?keywords=${_querry}&page_size=${page_size}&page_index=${page_index}&price_max=${price_max}&sort_by=${sort_by}&sort_direction=${sort_dir}`
    );
  }

  loadBrands() {
    return this.http.get<string>(`${this.API}/shop/products/brands`);
  }

  getCategory(_id: string) {
    return this.http.get<base_products>(
      `${this.API}/shop/products/category/${_id}`
    );
  }
}
