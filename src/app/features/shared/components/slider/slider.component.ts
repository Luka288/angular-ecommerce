import { CommonModule } from '@angular/common';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { products } from '../../interfaces/product.interface';
import { filter } from 'rxjs';

@Component({
  selector: 'app-slider',
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  @Input({ alias: 'sliderItem' }) sliderItem: products[] = [];
  @Input({ alias: 'brand' }) brand: string | undefined = undefined;

  products!: products[];
  filteredItems: products[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sliderItem'] || changes['brand']) {
      this.filter();
    }
  }

  filter(): void {
    if (this.brand) {
      this.filteredItems = this.sliderItem.filter(
        (product) => product.brand === this.brand
      );
    } else {
      this.filteredItems = this.sliderItem;
    }
  }
}

// this.everrestProducts.getProducts().subscribe((res) => {
//   this.products = res;
//   console.log(this.products);
// });

//! სლაიდერის სეტაპი
// <p-tag
// [value]="product.inventoryStatus"
// [severity]="'success'"
// class="absolute"
// styleClass="dark:!bg-surface-900"
// [ngStyle]="{ 'left.px': 5, 'top.px': 5 }"
// ></p-tag>
