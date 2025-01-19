import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { API_URL } from '../consts/consts';
import { userTokenEnum } from '../enums/token.enums';
import {
  baseUser,
  currUser,
  updatedResponse,
} from '../interfaces/user.interface';
import { last, map, tap } from 'rxjs';

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
        // ჭირდება რეფაქტორი
        const currInfo: currUser = {
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          address: res.address,
          age: res.age,
          phone: res.phone,
          gender: res.gender,
          zipcode: res.zipcode,
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
}
