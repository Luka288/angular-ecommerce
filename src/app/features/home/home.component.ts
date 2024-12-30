import { Component, inject } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { products } from '../shared/interfaces/product.interface';
import { SliderComponent } from '../shared/components/slider/slider.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselModule, SliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly everrestProducts = inject(ProductsService);

  products: products[] = [];

  ngOnInit(): void {
    this.everrestProducts.getProducts().subscribe((res) => {
      this.products = res;
    });
  }
}
