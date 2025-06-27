import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API_URL } from '../consts/consts';
import { UserTokens } from '../interfaces/tokens.interface';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { userTokenEnum } from '../enums/token.enums';
import {
  userSignUp,
  verifyUser,
} from '../interfaces/user.registration.interface';
import { userAvatar } from '../consts/avatar.generate';
import { recover } from '../interfaces/passrecover.interface';
import { AlertsServiceService } from './alerts-service.service';
import { CustomAlertService } from './custom-alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly alerts = inject(AlertsServiceService);
  private readonly customAlerts = inject(CustomAlertService);

  private authStateSubject = new BehaviorSubject<boolean>(this.checkUser());
  authState$ = this.authStateSubject.asObservable();

  userAvatar = userAvatar;

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
            this.customAlerts.displayAlert('Signed in', 'success');
            localStorage.setItem(userTokenEnum.access_token, res.access_token);
            localStorage.setItem(
              userTokenEnum.refresh_token,
              res.refresh_token
            );
            this.router.navigateByUrl('/home');
            this.authStateSubject.next(true);
          }
        }),
        catchError((err) => {
          this.customAlerts.displayAlert(`${err.error.error}`, 'error');
          return err;
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

  registerUser(userObject: userSignUp) {
    userObject.avatar = `${this.userAvatar}?seed=${userObject.firstName}`;
    return this.http.post(`${this.API}/auth/sign_up`, userObject).pipe(
      tap((res) => {
        if (res) {
          this.alerts.toast(
            'Account registered',
            'success',
            'Check email to verify'
          );
        }
      }),
      catchError((err) => {
        this.alerts.toast(err.error.errorKeys, 'error', '');
        return err;
      })
    );
  }

  verifyEmail(userEmail: string) {
    return this.http
      .post<verifyUser>(`${this.API}/auth/verify_email`, {
        email: userEmail,
      })
      .pipe(
        tap({
          next: (res) => {
            if (res.status === 200) {
              this.alerts.alert(
                'Check email to verify',
                'success',
                res.message
              );
            }
          },
          error: (err) => {
            this.alerts.alert('Something went wrong', 'error', 'red');
            return err;
          },
        })
      );
  }

  recoverPass(usrEmail: string) {
    return this.http.post<recover>(`${this.API}/auth/recovery`, {
      email: usrEmail,
    });
  }
}
