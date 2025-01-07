import { Component, Input } from '@angular/core';
import { products, single_item } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { TransformCurrencyPipe } from '../../pipes/transform-currency.pipe';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-page-card',
  imports: [CommonModule, TransformCurrencyPipe, RouterModule],
  templateUrl: './search-page-card.component.html',
  styleUrl: './search-page-card.component.scss',
})
export class SearchPageCardComponent {
  @Input({ alias: 'itemInfo' }) itemInput!: products;
}
