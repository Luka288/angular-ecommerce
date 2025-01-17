import { Routes } from '@angular/router';
import { mainPageResolver } from './features/shared/resolvers/main-page.resolver';
import { randomThreeItemResolver } from './features/shared/resolvers/random-three-item.resolver';
import { singleItemResolver } from './features/shared/resolvers/single-item.resolver';
import { authGuard } from './features/shared/guards/auth.guard';
import { userState } from './features/shared/enums/user.state.enum';
import { userGuard } from './features/shared/guards/user.guard';

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
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (c) => c.ProfileComponent
      ),
    title: 'Profile page',
    canActivate: [userGuard],
  },

  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth-page/auth-page.component').then(
        (c) => c.AuthPageComponent
      ),
    title: 'Ecommerce | Auth',
    canActivate: [authGuard],
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
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/cart.component').then((c) => c.CartComponent),
    title: 'Ecommerce | Cart page',
    canActivate: [userGuard],
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
