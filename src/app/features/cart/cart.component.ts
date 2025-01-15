import { Component, inject } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import {
  singleCartItem,
  totalItemsInfo,
} from '../shared/interfaces/cart.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartItemComponent } from '../shared/components/cart-item/cart-item.component';
import { AlertsServiceService } from '../shared/services/alerts-service.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly cartService = inject(CartService);

  baseProduct: singleCartItem[] = [];

  baseItems: totalItemsInfo[] = [];

  totalPrice: number = 0;

  ngOnInit() {
    this.getCreatedCart();
  }

  getCreatedCart() {
    this.cartService.getUserCart().subscribe((res) => {
      this.baseProduct = res.products;
      this.baseItems.push(res.total);
      this.totalPrice = res.total.price.current;
      console.log(this.baseItems);
    });
  }

  removedItem(productId: string) {
    this.cartService.removeItem(productId).subscribe((res) => {
      this.baseItems.push(res.total);
      this.totalPrice = res.total.price.current;
    });
    this.baseProduct = this.baseProduct.filter(
      (item) => item.productId !== productId
    );
  }

  updateTotalPrice(price: number) {
    this.totalPrice = price;
  }

  purchaseProducts() {
    this.cartService.orderProducts().subscribe((res) => {
      console.log(res);
      if (res.success) {
      }
    });
  }
}
