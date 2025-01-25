import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API_URL } from '../consts/consts';
import { userTokenEnum } from '../enums/token.enums';
import {
  baseUser,
  currUser,
  updatedResponse,
} from '../interfaces/user.interface';
import { catchError, last, map, tap, throwError } from 'rxjs';
import { replaceTokens } from '../interfaces/password.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  constructor(@Inject(API_URL) private API: string) {}

  usrByid(userId: string) {
    return this.http.get(`${this.API}/auth/id/${userId}`);
  }

  currUsr() {
    const token = localStorage.getItem(userTokenEnum.refresh_token);

    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<baseUser>(`${this.API}/auth`, { headers }).pipe(
      map((res) => {
        const currInfo: currUser = {
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          address: res.address,
          age: res.age,
          phone: res.phone,
          gender: res.gender,
          zipcode: res.zipcode,
          password: res.password,
        };

        return { base: res, baseInf: currInfo };
      })
    );
  }

  updateUser(key: string, value: string | number) {
    const token = localStorage.getItem(userTokenEnum.refresh_token);

    const headers = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const updateData = { [key]: value };

    console.log(updateData);

    return this.http.patch<updatedResponse>(
      `${this.API}/auth/update`,
      updateData,
      { headers }
    );
  }

  passwordChange(oldPassword: string, newPassword: string) {
    const token = localStorage.getItem(userTokenEnum.refresh_token);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    return this.http
      .patch<replaceTokens>(`${this.API}/auth/change_password`, body, {
        headers,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem(userTokenEnum.access_token, res.access_token);
          localStorage.setItem(userTokenEnum.refresh_token, res.refresh_token);
        }),
        catchError((err) => {
          return throwError(() => err);
        })
      );
  }
}
