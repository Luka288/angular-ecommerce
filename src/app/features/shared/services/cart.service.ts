import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API_URL } from '../consts/consts';
import { checkOut, userCart } from '../interfaces/cart.interface';
import { userTokenEnum } from '../enums/token.enums';
import { single_item } from '../interfaces/product.interface';
import { tap } from 'rxjs';
import { AlertsServiceService } from './alerts-service.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);

  constructor(@Inject(API_URL) private API: string) {}

  // თუ იუზერს არ აქვს Cart
  createCart(id: string, qty: number) {
    const token = localStorage.getItem(userTokenEnum.refresh_token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const reqBody = {
      id,
      quantity: qty,
    };

    return this.http.post<userCart>(`${this.API}/shop/cart/product`, reqBody, {
      headers,
    });
  }

  updateCart(id: string, quantity: number) {
    const token = localStorage.getItem(userTokenEnum.refresh_token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      id,
      quantity,
    };

    return this.http.patch<userCart>(`${this.API}/shop/cart/product`, body, {
      headers,
    });
  }

  getUserCart() {
    const token = localStorage.getItem(userTokenEnum.refresh_token);

    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<userCart>(`${this.API}/shop/cart`, { headers });
  }

  removeItem(id: string) {
    const token = localStorage.getItem(userTokenEnum.refresh_token) || '';

    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const body = {
      id: id,
    };

    return this.http.delete<userCart>(`${this.API}/shop/cart/product`, {
      headers,
      body,
    });
  }

  getItem(itemId: string) {
    return this.http.get<single_item>(`${this.API}/shop/products/id/${itemId}`);
  }

  orderProducts() {
    const token = localStorage.getItem(userTokenEnum.refresh_token);

    console.log(token);

    const headers = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<checkOut>(
      `${this.API}/shop/cart/checkout`,
      {
        //ცარიელი body
      },
      {
        headers,
      }
    );
  }
}
