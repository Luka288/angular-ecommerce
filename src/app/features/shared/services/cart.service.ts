import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API_URL } from '../consts/consts';
import { checkOut, userCart } from '../interfaces/cart.interface';
import { userTokenEnum } from '../enums/token.enums';
import { single_item } from '../interfaces/product.interface';
import { BehaviorSubject, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);

  constructor(@Inject(API_URL) private API: string) {}

  counterSubject = new BehaviorSubject<number>(0);
  counter$ = this.counterSubject.asObservable();

  updateCounter(value: number) {
    this.counterSubject.next(value);
  }

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

    return this.http
      .post<userCart>(`${this.API}/shop/cart/product`, reqBody, {
        headers,
      })
      .pipe(
        catchError((err) => {
          if (!err.ok) {
            return this.updateCart(id, qty);
          }
          return '';
        })
      );
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

    return this.http
      .patch<userCart>(`${this.API}/shop/cart/product`, body, {
        headers,
      })
      .pipe();
  }

  getUserCart() {
    const token = localStorage.getItem(userTokenEnum.refresh_token);

    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<userCart>(`${this.API}/shop/cart`, { headers }).pipe();
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

    return this.http
      .delete<userCart>(`${this.API}/shop/cart/product`, {
        headers,
        body,
      })
      .pipe();
  }

  getItem(itemId: string) {
    return this.http.get<single_item>(`${this.API}/shop/products/id/${itemId}`);
  }

  orderProducts() {
    const token = localStorage.getItem(userTokenEnum.refresh_token);

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

  clearCart() {
    const token = localStorage.getItem(userTokenEnum.refresh_token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(`${this.API}/shop/cart`, { headers });
  }
}
