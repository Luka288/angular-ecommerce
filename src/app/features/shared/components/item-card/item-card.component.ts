import { Component, EventEmitter, Input, Output } from '@angular/core';
import { single_item } from '../../interfaces/product.interface';

@Component({
  selector: 'app-item-card',
  imports: [],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  @Input({ alias: 'products' }) product!: single_item;
  @Output() removedItem = new EventEmitter<string>();

  remove(_id: string) {
    this.removedItem.emit(_id);
  }
}
