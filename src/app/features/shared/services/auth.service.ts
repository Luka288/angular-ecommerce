import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API_URL } from '../consts/consts';
import { UserTokens } from '../interfaces/tokens.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { userTokenEnum } from '../enums/token.enums';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private authStateSubject = new BehaviorSubject<boolean>(this.checkUser());
  authState$ = this.authStateSubject.asObservable();

  constructor(@Inject(API_URL) private API: string) {}

  login(email: string, password: string) {
    const responseBody = {
      email,
      password,
    };

    return this.http
      .post<UserTokens>(`${this.API}/auth/sign_in`, responseBody)
      .pipe(
        tap((res) => {
          if (res.access_token && res.refresh_token) {
            localStorage.setItem(userTokenEnum.access_token, res.access_token);
            localStorage.setItem(
              userTokenEnum.refresh_token,
              res.refresh_token
            );
            this.router.navigateByUrl('/home');
            this.authStateSubject.next(true);
          }
        })
      );
  }

  checkUser(): boolean {
    if (
      localStorage.getItem(userTokenEnum.access_token) ||
      localStorage.getItem(userTokenEnum.refresh_token)
    ) {
      return true;
    }
    return false;
  }

  logOut() {
    this.router.navigateByUrl('/home');
    localStorage.removeItem(userTokenEnum.access_token);
    localStorage.removeItem(userTokenEnum.refresh_token);
    this.authStateSubject.next(false);
  }
}