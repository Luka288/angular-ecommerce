import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API_URL } from '../consts/consts';
import { single_item } from '../interfaces/product.interface';
import { AlertsServiceService } from './alerts-service.service';
import { CustomAlertService } from './custom-alert.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private readonly alerts = inject(AlertsServiceService);
  private readonly customAlert = inject(CustomAlertService);

  constructor(@Inject(API_URL) private API: string) {}

  getItems(_id: string) {
    return this.http.get<single_item>(`${this.API}/shop/products/id/${_id}`);
  }

  saveItems(_id: string) {
    const wishlistArray: string[] = JSON.parse(
      localStorage.getItem('wishlist') || '[]'
    );

    if (!wishlistArray.includes(_id)) {
      wishlistArray.push(_id);
      localStorage.setItem('wishlist', JSON.stringify(wishlistArray));
      this.customAlert.displayAlert('Item added to wishlist', 'success');
    }
  }
}
