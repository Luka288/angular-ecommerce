import { Component, inject } from '@angular/core';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private readonly everrestProducts = inject(ProductsService);

  ngOnInit(): void {
    this.everrestProducts.getProducts().subscribe((res) => {
      console.log(res);
    });
  }
}
