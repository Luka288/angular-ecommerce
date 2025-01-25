import { CanActivateFn } from '@angular/router';

export const bottomNavGuard: CanActivateFn = (route, state) => {
  return true;
};
