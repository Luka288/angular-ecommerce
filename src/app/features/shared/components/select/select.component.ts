import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-select',
  imports: [SelectModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input({ alias: 'stock' }) stockOfProduct!: number;
  @Output() quantitySelected = new EventEmitter<number>();

  quantityControl = new FormControl(`1`, {
    nonNullable: true,
  });

  userQty() {
    // გადასვემს პროდუქტის გვერდს მომხმარებლის არჩეულ
    // რაოდენობას
    if (this.quantityControl.valid) {
      this.quantitySelected.emit(Number(this.quantityControl.value));
    }
  }
}
