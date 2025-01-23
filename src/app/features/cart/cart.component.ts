import { Component, inject } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import {
  singleCartItem,
  totalItemsInfo,
} from '../shared/interfaces/cart.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartItemComponent } from '../shared/components/cart-item/cart-item.component';
import { AlertsServiceService } from '../shared/services/alerts-service.service';
import { CardComponent } from '../shared/components/card/card.component';
import { TransformCurrencyPipe } from '../shared/pipes/transform-currency.pipe';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  isSuccess: boolean = false;

  toggleLoading: boolean = false;

  baseProduct: singleCartItem[] = [];

  baseItems: totalItemsInfo[] = [];

  totalQty: number = 0;

  totalPrice: number = 0;

  count: number = 3;

  ngOnInit() {
    this.getCreatedCart();
  }

  getCreatedCart() {
    this.cartService.getUserCart().subscribe((res) => {
      this.baseProduct = res.products;
      this.baseItems.push(res.total);
      this.totalPrice = res.total.price.current;
      this.totalQty = res.total.quantity;
      this.cartService.counterSubject.next(res.total.quantity);
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
      this.toggleLoading = true;
      if (res.success) {
        this.isSuccess = true;
        console.log(res);
        setInterval(() => {
          this.count--;
          if (this.count === 0) {
            this.router.navigateByUrl('/home');
          }
        }, 1000);
      }
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe((res) => {
      if (res) {
        this.baseProduct = [];
        this.baseItems = [];
        this.totalPrice = 0;
        this.totalQty = 0;
      }
    });
  }
}

// <app-cart-item
// *ngFor="let items of baseProduct"
// [cartItem]="items"
// (onItemRemove)="removedItem($event)"
// (totalPriceOutput)="updateTotalPrice($event)"
// />
