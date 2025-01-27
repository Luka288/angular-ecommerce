import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { SearchComponent } from '../shared/components/search/search.component';
import { WindowResizeDirective } from '../shared/directives/window-resize.directive';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SearchBooleanService } from '../shared/services/search-boolean.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../shared/services/products.service';
import { products } from '../shared/interfaces/product.interface';
import { filter, map } from 'rxjs';
import { disabledRoutes } from '../shared/consts/consts';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-bottom-navigation',
  imports: [SearchComponent, WindowResizeDirective, RouterModule, CommonModule],
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.scss',
})
export class BottomNavigationComponent {
  private readonly productsService = inject(ProductsService);
  readonly searchService = inject(SearchBooleanService);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  counter: number = 0;
  foundItems: products[] = [];
  isVisible: boolean = true;
  bottomSearchVisible: boolean = false;

  readonly forbiddenRoutes: string[] = disabledRoutes;

  constructor() {
    this.searchService.bottomNavSearch.subscribe((res) => {
      this.bottomSearchVisible = res;
    });

    // აკვირდება იუზერის ამჟამინდელ route და მალავს ქვედა ნავიგაციას
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        const currRoute = this.router.url;
        this.isVisible = !this.forbiddenRoutes.includes(currRoute);
      }
    });
  }

  ngOnInit() {
    this.cartService.counter$.subscribe((res) => {
      this.counter = res;
      this.changeDetector.detectChanges();
    });
  }

  foundProducts(res: string): void {
    this.productsService.searchProducts(res).subscribe((res) => {
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
