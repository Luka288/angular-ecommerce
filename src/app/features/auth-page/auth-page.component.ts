import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-auth-page',
  imports: [MatInputModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  authForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
  });

  constructor() {
    this.authForm.statusChanges.subscribe((res) => {
      console.log(res);
    });
  }

  // TODO: დინამიური ინპუტები, customErrorState.
}
