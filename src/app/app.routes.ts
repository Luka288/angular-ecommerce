import { Routes } from '@angular/router';
import { mainPageResolver } from './features/shared/resolvers/main-page.resolver';
import { randomThreeItemResolver } from './features/shared/resolvers/random-three-item.resolver';
import { singleItemResolver } from './features/shared/resolvers/single-item.resolver';

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
    path: 'panel',
    loadComponent: () =>
      import(
        './features/shared/components/panel-menu/panel-menu.component'
      ).then((c) => c.PanelMenuComponent),
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
    path: 'search',
    loadComponent: () =>
      import('./features/search-page/search-page.component').then(
        (c) => c.SearchPageComponent
      ),
  },

  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product-page/product-page.component').then(
        (c) => c.ProductPageComponent
      ),
    title: 'Ecommerce | Product details',
    resolve: {
      singleItem_resolve: singleItemResolver,
    },
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
