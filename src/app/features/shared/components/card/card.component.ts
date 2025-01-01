import { Component, Input } from '@angular/core';
import { products } from '../../interfaces/product.interface';
import { TruncatePipe } from '../../pipes/Truncate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [TruncatePipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ alias: 'singleItem' }) item!: products;

  constructor() {}
}
