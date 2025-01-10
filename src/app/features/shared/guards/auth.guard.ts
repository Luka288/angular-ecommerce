import { CanActivateFn, Router } from '@angular/router';
import { userTokenEnum } from '../enums/token.enums';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const refreshToken = localStorage.getItem(userTokenEnum.access_token);
  const accessToken = localStorage.getItem(userTokenEnum.refresh_token);

  if (!refreshToken && !accessToken) {
    return true;
  }
  return router.parseUrl('/home');
};
