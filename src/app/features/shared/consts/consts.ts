import { InjectionToken } from '@angular/core';
import { navigation } from '../interfaces/navigation.interface';

export const baseNav: navigation[] = [
  {
    title: 'home',
    path: '/home',
  },

  {
    title: 'support',
    path: '',
  },

  {
    title: 'Login',
    path: '/auth',
    iconSrc: ['bi', 'bi-box-arrow-in-right'],
  },
];

export const authNav: navigation[] = [
  {
    title: 'home',
    path: '/home',
  },

  {
    title: 'support',
    path: '',
  },

  {
    title: 'Cart',
    path: '/cart',
  },

  {
    title: 'Profile',
    path: '/profile',
    iconSrc: ['bi', 'bi-person-circle'],
  },

  {
    title: 'Logout',
    path: '/home',
    iconSrc: ['bi', 'bi-box-arrow-left'],
  },
];

export const responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: '375px',
    numVisible: 1,
    numScroll: 1,
  },

  {
    breakpoint: '320px',
    numVisible: 1,
    numScroll: 1,
  },
];

export const galeriaResponsive = [
  {
    breakpoint: '1024px',
    numVisible: 3,
  },
  {
    breakpoint: '768px',
    numVisible: 2,
  },
  {
    breakpoint: '560px',
    numVisible: 1,
  },

  {
    breakpoint: '425px',
    numVisible: 1,
    maxWidth: '300px',
  },
];

export const API_URL = new InjectionToken<string>('');

export const disabledRoutes: string[] = [
  '/auth',
  '/profile',
  '/reset-password',
];
