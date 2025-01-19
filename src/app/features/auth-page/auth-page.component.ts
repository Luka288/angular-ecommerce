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
import { MatSelectModule } from '@angular/material/select';
import { userSignUp } from '../shared/interfaces/user.registration.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  imports: [
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    RouterLink,
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  private readonly authService = inject(AuthService);
  private readonly alert = inject(AlertsServiceService);

  tabIndex: number = 0;

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

  signUpForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(16),
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(16),
    ]),

    email: new FormControl('', [Validators.email, Validators.required]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),

    address: new FormControl('', [Validators.required]),

    phone: new FormControl('+995', [
      Validators.required,
      Validators.pattern('^\\+?[0-9]{7,15}$'),
    ]),

    zipcode: new FormControl('', [
      Validators.required,
      Validators.pattern('^\\d{4}(-\\d{4})?$'),
    ]),

    age: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(100),
    ]),

    gender: new FormControl('', [Validators.required]),
  });

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

  userRegister() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      this.alert.toast('Registration form is not valid', 'error', '');
      return;
    }

    const userObject = this.signUpForm.value as userSignUp;

    this.authService
      .registerUser(userObject)
      .pipe(
        tap((res) => {
          if (res) {
            this.alert.toast(
              'Account registered',
              'success',
              'Check email to verify'
            );
            this.verify(userObject.email);
          }
        }),
        catchError((err) => {
          this.alert.toast(err.error.errorKeys, 'error', '');
          return err;
        })
      )
      .subscribe();

    this.resetForm();
    this.signUpForm.markAsUntouched();
  }

  resetForm() {
    this.signUpForm.reset();
    this.signUpForm.markAsUntouched();
  }

  verify(email: string) {
    this.authService.verifyEmail(email).subscribe((res) => {
      if (res.status === 200) {
        this.alert.alert('Check email to verify', 'success', res.message);
        console.log(res.message);
      }
    });
  }
}
