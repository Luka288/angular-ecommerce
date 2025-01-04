import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { products } from '../interfaces/product.interface';
import { ProductsService } from '../services/products.service';
import { LoadingStateService } from '../services/loading-state.service';
import { finalize } from 'rxjs';

export const randomThreeItemResolver: ResolveFn<products[]> = (
  route,
  state
) => {
  const everrestProducts = inject(ProductsService);
  const loadingService = inject(LoadingStateService);
  loadingService.show();
  return everrestProducts.randomProducts();
};
