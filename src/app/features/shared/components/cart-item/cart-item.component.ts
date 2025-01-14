import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { singleCartItem } from '../../interfaces/cart.interface';
import { CartService } from '../../services/cart.service';
import { single_item } from '../../interfaces/product.interface';
import { RoundPipe } from '../../pipes/round.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { AlertsServiceService } from '../../services/alerts-service.service';

@Component({
  selector: 'app-cart-item',
  imports: [RoundPipe, ReactiveFormsModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  private readonly cartService = inject(CartService);
  private readonly alerts = inject(AlertsServiceService);

  @Input({ alias: 'cartItem' }) cartItemInput!: singleCartItem;
  @Output() onItemRemove = new EventEmitter<string>();
  @Output() totalPriceOutput = new EventEmitter<number>();

  singleItem: single_item | null = null;
  itemStockLimit: number = 0;

  quantityCange = new FormControl();

  ngOnInit(): void {
    console.log(this.cartItemInput);

    this.quantityCange.setValue(this.cartItemInput.quantity);

    if (this.cartItemInput.productId) {
      this.getItem(this.cartItemInput.productId);
    }

    this.trackForChanges();
  }

  remove(id: string) {
    this.onItemRemove.emit(id);
  }

  getItem(itemId: string) {
    this.cartService.getItem(itemId).subscribe((res) => {
      this.singleItem = res;
      this.itemStockLimit = res.stock;
    });
  }

  trackForChanges() {
    this.quantityCange.valueChanges
      .pipe(
        debounceTime(300),
        tap((res) => {
          if (res) {
            this.alerts.toast('Item quantity updated', 'success', '');
          }
        })
      )
      .subscribe((res) => {
        this.updateCart(res);
      });
  }

  updateCart(qty: number) {
    this.cartService.updateCart(this.singleItem!._id, qty).subscribe((res) => {
      this.totalPriceOutput.emit(res.total.price.current);
    });
  }
}
