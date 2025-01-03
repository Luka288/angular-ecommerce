import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { base_products, products } from '../interfaces/product.interface';

export const mainPageResolver: ResolveFn<products[]> = (route, state) => {
  const everrestProducts = inject(ProductsService);
  return everrestProducts.getProducts();
};
