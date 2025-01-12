import { Component, Input } from '@angular/core';
import { products, single_item } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { TransformCurrencyPipe } from '../../pipes/transform-currency.pipe';
import { RouterLink, RouterModule } from '@angular/router';
import { RoundPipe } from '../../pipes/round.pipe';

@Component({
  selector: 'app-search-page-card',
  imports: [CommonModule, TransformCurrencyPipe, RouterModule, RoundPipe],
  templateUrl: './search-page-card.component.html',
  styleUrl: './search-page-card.component.scss',
})
export class SearchPageCardComponent {
  @Input({ alias: 'itemInfo' }) itemInput!: products;
  @Input({ alias: 'rating' }) ratingInput: number | null = null;

  // იგივე ფუნქცია რაც product page იყენებს ვარსკვლავებისთვის
  calcRating(rating?: number): { full: number; half: number } {
    const full = Math.floor(rating!);
    const half = rating! % 1 >= 0.5 ? 1 : 0;
    return { full, half };
  }
}
