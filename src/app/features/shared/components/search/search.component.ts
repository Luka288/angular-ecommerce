import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { SearchBooleanService } from '../../services/search-boolean.service';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  readonly searchService = inject(SearchBooleanService);

  searchControl = new FormControl('');
  isVisible: boolean = false;

  constructor() {
    this.searchService.isSearchVisible.subscribe((res) => {
      if (res) {
        this.isVisible = true;
      }
    });
  }

  ngAfterViewInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((res) => {
      console.log(res);
    });
  }

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
  }

  showInput(): void {
    this.isVisible = true;
    this.searchService.isSearchVisible.next(true);
  }

  hideInput(): void {
    this.isVisible = false;
    this.searchService.isSearchVisible.next(false);
    this.searchService.bottomNavSearch.next(false);
  }
}
