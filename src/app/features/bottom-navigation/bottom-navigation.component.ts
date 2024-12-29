import { Component, inject } from '@angular/core';
import { SearchComponent } from '../shared/components/search/search.component';
import { WindowResizeDirective } from '../shared/directives/window-resize.directive';
import { RouterModule } from '@angular/router';
import { SearchBooleanService } from '../shared/services/search-boolean.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-navigation',
  imports: [SearchComponent, WindowResizeDirective, RouterModule, CommonModule],
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.scss',
})
export class BottomNavigationComponent {
  readonly searchService = inject(SearchBooleanService);

  constructor() {
    this.searchService.bottomNavSearch.subscribe((res) => {
      this.bottomSearchVisible = res;
    });
  }

  bottomSearchVisible: boolean = false;

  toggle() {
    this.bottomSearchVisible = !this.bottomSearchVisible;
    this.searchService.bottomNavSearch.next(this.bottomSearchVisible);
    this.searchService.isSearchVisible.next(this.bottomSearchVisible);
  }
}
