import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { products } from '../interfaces/product.interface';
import { ProductsService } from '../services/products.service';

export const randomThreeItemResolver: ResolveFn<products[]> = (
  route,
  state
) => {
  const everrestProducts = inject(ProductsService);
  return everrestProducts.randomProducts();
};
