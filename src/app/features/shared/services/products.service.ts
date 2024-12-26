import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { base_products, products } from '../interfaces/product.interface';
import { API_URL } from '../consts/consts';
import { map } from 'rxjs';

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
}

// .pipe(map((res) => res.products));
