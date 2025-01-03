import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { single_item } from '../interfaces/product.interface';

export const singleItemResolver: ResolveFn<single_item> = (route, state) => {
  const everest = inject(ProductsService);
  const _id = route.paramMap.get('id')!;

  return everest.singleItem(_id);
};
