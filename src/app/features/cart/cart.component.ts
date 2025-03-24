import { Component, inject, signal } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import {
  singleCartItem,
  totalItemsInfo,
} from '../shared/interfaces/cart.interface';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartItemComponent } from '../shared/components/cart-item/cart-item.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  baseProduct = signal<singleCartItem[]>([]);
  totalQty = signal<number>(0);
  totalPrice = signal<number>(0);
  isSuccess = signal<boolean>(false);
  toggleLoading = signal<boolean>(false);

  count: number = 3;
  baseItems: totalItemsInfo[] = [];

  ngOnInit() {
    this.getCreatedCart();
  }

  getCreatedCart() {
    this.cartService.getUserCart().subscribe((res) => {
      this.baseProduct.set(res.products);
      this.totalQty.set(res.total.quantity);
      this.totalPrice.set(res.total.price.current);
      this.cartService.counterSubject.next(res.total.quantity);
      this.baseItems.push(res.total);
    });
  }

  removedItem(productId: string) {
    this.cartService.removeItem(productId).subscribe((res) => {
      this.baseItems.push(res.total);
      this.totalPrice.set(res.total.price.current);
    });

    this.baseProduct.update((products) =>
      products.filter((item) => item.productId !== productId)
    );
  }

  updateTotalPrice(price: number) {
    this.totalPrice.set(price);
  }

  purchaseProducts() {
    this.cartService.orderProducts().subscribe((res) => {
      this.toggleLoading.set(true);

      if (res.success) {
        this.isSuccess.set(true);

        const inter = setInterval(() => {
          this.count--;
          if (this.count === 0) {
            clearInterval(inter);
            this.router.navigateByUrl('/home');
          }
        }, 1000);
      }
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe((res) => {
      if (res) {
        this.baseProduct.set([]);
        this.baseItems = [];
        this.totalPrice.set(0);
        this.totalQty.set(0);
      }
    });
  }
}
