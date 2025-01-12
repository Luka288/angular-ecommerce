import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';
import { AlertsServiceService } from '../shared/services/alerts-service.service';
import { catchError, tap } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  imports: [MatInputModule, MatTabsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  private readonly authService = inject(AuthService);
  private readonly alert = inject(AlertsServiceService);

  authForm = new FormGroup({
    emailFormControl: new FormControl('lukagaxokidze28@gmail.com', [
      Validators.email,
      Validators.required,
    ]),

    passwordControl: new FormControl('12345678', [
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.required,
    ]),
  });

  constructor() {}

  submitLogin() {
    if (!this.authForm.valid) {
      return;
    }

    // email სტრინგის სახით
    const email = this.authForm.controls.emailFormControl.value as string;
    // password სტრინგის სახით
    const password = this.authForm.controls.passwordControl.value as string;

    this.authService
      .login(email, password)
      .pipe(
        tap((res) => {
          this.alert.toast('Signed in', 'success', '');
        }),
        catchError((err) => {
          this.alert.toast(err.error.error, 'error', '');
          return err;
        })
      )
      .subscribe();
  }
}

// TODO: !register!
