import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-paginator-dropdown',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './paginator-dropdown.component.html',
  styleUrl: './paginator-dropdown.component.scss',
})
export class PaginatorDropdownComponent {
  @Input({ alias: 'totalPagesInput' }) totalPages!: number;
  @Output() notifyPageSize = new EventEmitter<number>();

  pageSizeSelect: number = 0;

  pageSizeControl = new FormControl('Select page size');

  constructor() {
    this.listenChanges();
  }

  // უსმენს ფორმის კონტროლს და აგზავნის განახლებულ ლიმიტს
  listenChanges() {
    this.pageSizeControl.valueChanges.subscribe((res) => {
      this.notifyPageSize.emit(Number(res));
    });
  }
}
