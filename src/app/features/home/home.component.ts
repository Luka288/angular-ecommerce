import { Component, inject } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { products } from '../shared/interfaces/product.interface';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { CardComponent } from '../shared/components/card/card.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselModule, SliderComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly everrestProducts = inject(ProductsService);

  products: products[] = [];
  brands: string[] = [];
  randomThree: products[] = [];

  ngOnInit(): void {
    this.everrestProducts.getProducts().subscribe((res) => {
      this.products = res;
      this.brands = res
        .map((product) => product.brand)
        .filter((value, index, self) => self.indexOf(value) === index)
        .filter(
          (brand) =>
            this.products.filter((product) => product.brand === brand).length >=
            3
        );
    });

    this.loadRandomProducts();
  }

  loadRandomProducts() {
    this.everrestProducts.randomProducts().subscribe((res) => {
      this.randomThree = res;
      console.log(this.randomThree);
    });
  }
}
