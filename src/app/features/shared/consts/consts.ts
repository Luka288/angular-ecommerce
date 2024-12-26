import { InjectionToken } from '@angular/core';
import { navigation } from '../interfaces/navigation.interface';

//! დეფოლტ იუზერის ნავიგაცია (როცა ავტორიზირებული არაა)
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
    title: 'contact us',
    path: '',
  },

  {
    title: 'Login',
    path: '/auth',
    iconSrc: ['bi', 'bi-box-arrow-in-right'],
  },
];
// ! ლოგინის აიკონი
// iconSrc: 'bi bi-box-arrow-in-righ',

// ! ავტორიზირებული იუზერისთვის
// {
//   title: 'profile',
//   path: '',
//   iconSrc: 'bi bi-person-circle',
// },

export const API_URL = new InjectionToken<string>('');
