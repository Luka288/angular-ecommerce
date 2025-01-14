import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { singleCartItem } from '../../interfaces/cart.interface';
import { CartService } from '../../services/cart.service';
import { single_item } from '../../interfaces/product.interface';
import { RoundPipe } from '../../pipes/round.pipe';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
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
    });
  }

  trackForChanges() {
    this.quantityCange.valueChanges
      .pipe(
        tap((res) => {
          if (res) {
            this.alerts.toast('Item quantity updated', 'success', '');
          }
        })
      )
      .subscribe((res) => {
        this.cartService
          .updateCart(this.singleItem!._id, res)
          .subscribe((res) => {
            // console.log(res);
            this.totalPriceOutput.emit(res.total.price.current);
          });
      });
  }
}
