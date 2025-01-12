import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API_URL } from '../consts/consts';
import { userCart } from '../interfaces/cart.interface';
import { userTokenEnum } from '../enums/token.enums';

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
}
