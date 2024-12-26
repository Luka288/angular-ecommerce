import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { baseNav } from '../shared/consts/consts';
import { navigation } from '../shared/interfaces/navigation.interface';
import { SearchComponent } from '../shared/components/search/search.component';
import { WindowResizeDirective } from '../shared/directives/window-resize.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navgiation',
  imports: [RouterModule, SearchComponent, WindowResizeDirective, CommonModule],
  templateUrl: './navgiation.component.html',
  styleUrl: './navgiation.component.scss',
})
export class NavgiationComponent {
  toggleNav: boolean = false;
  base_nav: navigation[] = baseNav;

  toggleF() {
    this.toggleNav = !this.toggleNav;

    console.log(this.toggleNav);
  }
}
