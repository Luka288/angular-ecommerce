import { Component, inject } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { products } from '../shared/interfaces/product.interface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly everrestProducts = inject(ProductsService);

  ngOnInit(): void {
    this.everrestProducts.getProducts().subscribe((res) => {
      this.products = res;
      console.log(this.products);
    });
  }

  products!: products[];
}

// <p-tag
// [value]="product.inventoryStatus"
// [severity]="'success'"
// class="absolute"
// styleClass="dark:!bg-surface-900"
// [ngStyle]="{ 'left.px': 5, 'top.px': 5 }"
// ></p-tag>
