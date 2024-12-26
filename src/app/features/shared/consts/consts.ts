import { navigation } from '../../core/interfaces/navigation.interface';

//! დეფოლტ იუზერის ნავიგაცია (როცა ავტორიზირებული არაა)
export const baseNav: navigation[] = [
  {
    title: 'home',
    path: '',
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
    path: '',
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
