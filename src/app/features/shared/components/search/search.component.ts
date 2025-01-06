import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { debounceTime } from 'rxjs';
import { SearchBooleanService } from '../../services/search-boolean.service';
import { ProductsService } from '../../services/products.service';
import { products } from '../../interfaces/product.interface';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, AutoFocusModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private readonly productsService = inject(ProductsService);
  readonly searchService = inject(SearchBooleanService);
  private readonly route = inject(Router);

  searchControl = new FormControl('', { nonNullable: true });
  isVisible: boolean = false;
  foundItems: products[] = [];

  constructor() {
    this.searchService.isSearchVisible.subscribe((res) => {
      if (res) {
        this.isVisible = true;
      }
    });
  }

  ngAfterViewInit(): void {
    this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe((res) => {
      if (res === '') {
        this.foundItems = [];
        return;
      }
      this.foundProducts(res);
    });
  }

  foundProducts(res: string): void {
    this.foundItems = [];
    this.productsService.searchProducts(res).subscribe((res) => {
      this.foundItems = res;
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

  submit(event: Event): void {
    event.preventDefault();
    if (this.searchControl.value === '') {
      return;
    } else {
      this.route.navigate(['/search'], {
        queryParams: { query: this.searchControl.value },
      });
      this.foundProducts(this.searchControl.value);
      this.searchControl.reset();
      this.hideInput();
    }
  }
}
