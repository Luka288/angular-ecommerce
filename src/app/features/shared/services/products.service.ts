import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import {
  base_products,
  products,
  single_item,
} from '../interfaces/product.interface';
import { API_URL } from '../consts/consts';
import { map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly http = inject(HttpClient);

  constructor(@Inject(API_URL) private API: string) {}

  getProducts() {
    return this.http
      .get<base_products>(`${this.API}/shop/products/all?page_size=50`)
      .pipe(map((res) => res.products));
  }

  randomProducts() {
    return this.getProducts().pipe(
      map((res) => {
        const randomProduct = res.sort(() => Math.random() - 0.5);
        return randomProduct.slice(0, 3);
      })
    );
  }

  brands() {
    return this.getProducts().pipe(
      map((res) => {
        return res
          .map((product) => product.brand)
          .filter((value, index, self) => self.indexOf(value) === index)
          .filter(
            (brand) =>
              res.filter((product) => product.brand === brand).length >= 3
          );
      })
    );
  }

  searchProducts(query?: string) {
    return this.http
      .get<base_products>(
        `${this.API}/shop/products/search?keywords=${query}&page_size=50`
      )
      .pipe(map((res) => res.products));
  }

  // randomProducts() {
  //   return this.http
  //     .get<base_products>(`${this.API}/shop/products/all?page_size=50`)
  //     .pipe(
  //       map((res) => {
  //         //! აბრუნებს 3 რანდომულ პროდუქტს მთავარი ფეიჯისთვის
  //         const randomProducts = res.products.sort(() => Math.random() - 0.5);
  //         return randomProducts.slice(0, 3);
  //       })
  //     );
  // }

  productWithId(id: string) {
    return this.http.get<products>(`${this.API}/shop/products/id/${id}`);
  }

  singleItem(_id: string) {
    return this.http.get<single_item>(`${this.API}/shop/products/id/${_id}`);
  }

  searchProduct(_querry: string, page_index: number = 1) {
    return this.http.get<base_products>(
      `${this.API}/shop/products/search?keywords=${_querry}&page_size=10&page_index=${page_index}`
    );
  }
}
