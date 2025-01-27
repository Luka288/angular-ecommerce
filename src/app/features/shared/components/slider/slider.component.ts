import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { products } from '../../interfaces/product.interface';
import { responsiveOptions } from '../../consts/consts';
import { RouterLink } from '@angular/router';
import { TransformCurrencyPipe } from '../../pipes/transform-currency.pipe';

@Component({
  selector: 'app-slider',
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    RouterLink,
    TransformCurrencyPipe,
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  @Input({ alias: 'sliderItem' }) sliderItem: products[] = [];
  @Input({ alias: 'brand' }) brand: string | undefined = undefined;
  @Output() emitItemid = new EventEmitter<string>();
  @Output() emitWishlist = new EventEmitter<string>();

  products!: products[];
  filteredItems: products[] = [];

  responsiveLayout = responsiveOptions;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sliderItem'] || changes['brand']) {
      this.filter();
    }
  }

  filter(): void {
    if (this.brand && this.sliderItem.length >= 3) {
      this.filteredItems = this.sliderItem.filter(
        (product) => product.brand === this.brand
      );
    } else {
      this.filteredItems = this.sliderItem;
    }
  }

  addToCart(_id: string) {
    this.emitItemid.emit(_id);
  }

  prevent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  wishlistedId(_id: string) {
    this.emitWishlist.emit(_id);
  }
}
