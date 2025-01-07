import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API_URL } from '../consts/consts';
import { BrandNames } from '../interfaces/brands.interface';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  private readonly http = inject(HttpClient);

  constructor(@Inject(API_URL) private API: string) {}

  getBrands() {
    return this.http.get<BrandNames[]>(`${this.API}/shop/products/brands`);
  }
}

// <BrandNames>
