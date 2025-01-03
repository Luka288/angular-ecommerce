import { Component, Input } from '@angular/core';
import { products } from '../../interfaces/product.interface';
import { TruncatePipe } from '../../pipes/Truncate.pipe';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-card',
  imports: [TruncatePipe, RouterLink, CardModule, ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ alias: 'singleItem' }) item!: products;

  constructor() {}

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  prevent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
