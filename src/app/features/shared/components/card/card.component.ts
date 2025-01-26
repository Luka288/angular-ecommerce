import { Component, EventEmitter, Input, Output } from '@angular/core';
import { products } from '../../interfaces/product.interface';
import { TruncatePipe } from '../../pipes/Truncate.pipe';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TransformCurrencyPipe } from '../../pipes/transform-currency.pipe';
import { _getOptionScrollPosition } from '@angular/material/core';

@Component({
  selector: 'app-card',
  imports: [
    TruncatePipe,
    RouterLink,
    CardModule,
    ButtonModule,
    TransformCurrencyPipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ alias: 'singleItem' }) item!: products;
  @Output() cartItemId = new EventEmitter<string>();
  @Output() wishlist = new EventEmitter<string>();

  constructor() {}

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  prevent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  emitItem(_id: string) {
    this.cartItemId.emit(_id);
  }

  emitwishlistedItem(_id: string) {
    this.wishlist.emit(_id);
  }
}
