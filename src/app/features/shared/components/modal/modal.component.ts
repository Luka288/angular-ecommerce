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

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule, CommonModule],
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

  userChange = new FormGroup({
    inputControl: new FormControl('', { nonNullable: true }),
    genderControl: new FormControl('Select Gender', { nonNullable: true }),
  });

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
}
