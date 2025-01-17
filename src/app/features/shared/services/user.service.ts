import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API_URL } from '../consts/consts';
import { currentUser } from '../interfaces/user.interface';
import { userTokenEnum } from '../enums/token.enums';

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

    return this.http.get<currentUser>(`${this.API}/auth`, { headers });
  }
}
