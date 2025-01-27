import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../shared/services/auth.service';
import { AlertsServiceService } from '../shared/services/alerts-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [MatInputModule, ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  private readonly autService = inject(AuthService);
  private readonly alert = inject(AlertsServiceService);
  private readonly router = inject(Router);

  userEmail = new FormControl('', [Validators.required, Validators.email]);

  count: number = 3;

  isSended: boolean = false;

  submit() {
    if (!this.userEmail.valid) {
      return;
    }
    this.autService.recoverPass(this.userEmail.value!).subscribe((res) => {
      if (res.status === 200) {
        this.alert.alert('Password sent to gmail', 'success', res.message);
        this.isSended = true;
        this.redirect();
      }
    });
  }

  redirect() {
    if (this.isSended) {
      setInterval(() => {
        this.count--;
        if (this.count === 0) {
          this.router.navigateByUrl('/home');
        }
      }, 1000);
    }
  }
}
