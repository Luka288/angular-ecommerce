import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchControl = new FormControl('');

  ngAfterViewInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((res) => {
      console.log(res);
    });
  }
}
