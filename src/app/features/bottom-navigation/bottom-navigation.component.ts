import { Component } from '@angular/core';
import { SearchComponent } from '../shared/components/search/search.component';
import { WindowResizeDirective } from '../shared/directives/window-resize.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-navigation',
  imports: [SearchComponent, WindowResizeDirective, RouterModule],
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.scss',
})
export class BottomNavigationComponent {
  isSearchVisible: boolean = false;

  toggle() {
    this.isSearchVisible = !this.isSearchVisible;
    console.log(this.isSearchVisible);
  }
}
