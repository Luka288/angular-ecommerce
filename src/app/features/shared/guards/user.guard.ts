import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { userTokenEnum } from '../enums/token.enums';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const refreshToken = localStorage.getItem(userTokenEnum.access_token);
  const accessToken = localStorage.getItem(userTokenEnum.refresh_token);

  if (!refreshToken && !accessToken) {
    return router.createUrlTree(['/home']);
  }

  return true;
};
