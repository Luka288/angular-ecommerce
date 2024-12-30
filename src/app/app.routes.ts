import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
    title: 'Ecommerce | Home',
  },

  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth-page/auth-page.component').then(
        (c) => c.AuthPageComponent
      ),
    title: 'Ecommerce | Auth',
  },

  {
    path: ':id',
    loadComponent: () =>
      import('./features/product-page/product-page.component').then(
        (c) => c.ProductPageComponent
      ),
    title: 'Ecommerce | Product details',
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
