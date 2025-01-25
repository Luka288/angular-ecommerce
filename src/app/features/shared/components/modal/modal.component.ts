import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule, CommonModule, MatInputModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() propertyLabel: string | undefined;
  @Input() propertyKey: string | undefined;
  @Input() propertyValue: string | number | null = null;
  @Input() isOpen: boolean = false;
  @Output() emitValue = new EventEmitter<{
    key: string;
    value: string | number;
  }>();

  @Output() emitNewPassword = new EventEmitter<{
    oldPassword: string;
    newPassword: string;
  }>();

  userChange = new FormGroup({
    inputControl: new FormControl('', { nonNullable: true }),
    genderControl: new FormControl('Select Gender', { nonNullable: true }),
  });

  passwordChangeForm = new FormGroup({
    oldPassword: new FormControl('niniko7877', [
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.required,
    ]),
    newPassword: new FormControl('niniko787', [
      Validators.minLength(8),
      Validators.maxLength(16),
      Validators.required,
    ]),
  });

  ngOnChanges() {
    if (this.propertyKey === 'password') {
    } else {
      this.updatedValue;
    }
  }

  onFocus() {
    if (this.propertyKey === 'email') {
      this.userChange.controls.inputControl.setValidators([Validators.email]);
      this.userChange.controls.inputControl.updateValueAndValidity();
    } else if (this.propertyKey === 'gender') {
    }
  }

  resetForm() {
    this.isOpen = false;
    if (!this.isOpen) {
      this.userChange.reset();
    }
  }

  updatedValue(key: string, updatedVal: string | number) {
    if (updatedVal === '' || !this.userChange.controls.inputControl.valid) {
      return;
    }
    this.emitValue.emit({ key, value: updatedVal });
    this.userChange.controls.inputControl.reset();
  }

  submit() {
    if (
      !this.passwordChangeForm.controls.oldPassword.value ||
      !this.passwordChangeForm.controls.newPassword.value ||
      !this.passwordChangeForm.valid
    ) {
      this.passwordChangeForm.markAllAsTouched();
      return;
    }
    const oldPassword = this.passwordChangeForm.controls.oldPassword.value;
    const newPassword = this.passwordChangeForm.controls.newPassword.value;

    this.submitPassword(oldPassword!, newPassword!);
    this.passwordChangeForm.reset();
  }

  submitPassword(oldPassword: string, newPassword: string) {
    this.emitNewPassword.emit({ oldPassword, newPassword });
  }

  resetPassform() {
    this.passwordChangeForm.reset();
    this.passwordChangeForm.untouched;
  }
}
