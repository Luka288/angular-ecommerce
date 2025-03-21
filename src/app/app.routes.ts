import { Routes } from '@angular/router';
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
    //? ანელებს ფეიჯს
    // resolve: {
    //   mainItemsResolver: randomThreeItemResolver,
    // },
  },

  {
    path: 'test',
    loadComponent: () =>
      import(
        './features/shared/components/paginator-dropdown/paginator-dropdown.component'
      ).then((c) => c.PaginatorDropdownComponent),
    title: 'Test Page',
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
    path: 'reset-password',
    loadComponent: () =>
      import('./features/reset-password/reset-password.component').then(
        (c) => c.ResetPasswordComponent
      ),
    title: 'Reset Password',
  },

  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then(
        (c) => c.WishlistComponent
      ),
    title: 'Ecommerce | Wishlist page',
    // canActivate: [userGuard],
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
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((c) => c.AboutComponent),
    title: 'Ecommerce | About',
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
