import { Component, inject } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';
import { CarouselModule } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { products } from '../shared/interfaces/product.interface';
import { SliderComponent } from '../shared/components/slider/slider.component';
import { CardComponent } from '../shared/components/card/card.component';
import { GaleriaComponent } from '../shared/components/galeria/galeria.component';
import { thumbnailInterface } from '../shared/interfaces/slider.interface';
import { SaveItemsService } from '../shared/services/save-items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    CarouselModule,
    SliderComponent,
    CardComponent,
    GaleriaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly everrestProducts = inject(ProductsService);
  private readonly perviousProducts = inject(SaveItemsService);
  private readonly router = inject(ActivatedRoute);

  products: products[] = [];
  brands: string[] = [];
  randomThree: products[] = [];
  thumbnails: thumbnailInterface[] = [];
  seenThree: products[] = [];

  ngOnInit(): void {
    this.router.data.subscribe((res) => {
      this.products = res['products'];
      this.brands = this.products
        .map((product) => product.brand)
        .filter((value, index, self) => self.indexOf(value) === index)
        .filter(
          (brand) =>
            this.products.filter((product) => product.brand === brand).length >=
            3
        );
    });

    this.loadRandomProducts();
    this.perviousProducts.getSavedItems().subscribe((res) => {
      this.seenItems(res);
    });
  }

  loadRandomProducts() {
    this.router.data.subscribe((res) => {
      this.randomThree = res['randomThree'];
    });
  }

  seenItems(ids: string[]) {
    ids.forEach((id) => {
      this.everrestProducts.productWithId(id).subscribe((res) => {
        this.seenThree.push(res);
      });
    });
  }
}
