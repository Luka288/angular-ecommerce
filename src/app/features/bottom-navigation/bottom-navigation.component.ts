import { Component, inject } from '@angular/core';
import { SearchComponent } from '../shared/components/search/search.component';
import { WindowResizeDirective } from '../shared/directives/window-resize.directive';
import { RouterModule } from '@angular/router';
import { SearchBooleanService } from '../shared/services/search-boolean.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../shared/services/products.service';
import { products } from '../shared/interfaces/product.interface';

@Component({
  selector: 'app-bottom-navigation',
  imports: [SearchComponent, WindowResizeDirective, RouterModule, CommonModule],
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.scss',
})
export class BottomNavigationComponent {
  private readonly productsService = inject(ProductsService);
  readonly searchService = inject(SearchBooleanService);

  foundItems: products[] = [];

  constructor() {
    this.searchService.bottomNavSearch.subscribe((res) => {
      this.bottomSearchVisible = res;
    });
  }

  bottomSearchVisible: boolean = false;

  foundProducts(res: string): void {
    this.productsService.searchProducts(res).subscribe((res) => {
      console.log(res);
      this.foundItems = res;
    });
  }

  toggle() {
    this.bottomSearchVisible = !this.bottomSearchVisible;
    this.searchService.bottomNavSearch.next(this.bottomSearchVisible);
    this.searchService.isSearchVisible.next(this.bottomSearchVisible);
  }

  handleClick(event: MouseEvent) {
    event.preventDefault();
  }
}
