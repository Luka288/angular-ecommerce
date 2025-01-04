import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { products } from '../interfaces/product.interface';
import { LoadingStateService } from '../services/loading-state.service';
import { tap, finalize } from 'rxjs';

export const mainPageResolver: ResolveFn<products[]> = (route, state) => {
  const everrestProducts = inject(ProductsService);
  const loadingState = inject(LoadingStateService);
  const router = inject(Router);

  return everrestProducts.getProducts();
};
