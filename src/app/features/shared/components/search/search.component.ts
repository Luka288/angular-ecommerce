import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchControl = new FormControl('');
  isVisible: boolean = false;

  ngAfterViewInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((res) => {
      console.log(res);
    });
  }

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
  }
}
