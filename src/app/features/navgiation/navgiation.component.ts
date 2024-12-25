import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { baseNav } from '../shared/consts/consts';
import { navigation } from '../core/interfaces/navigation.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from '../shared/components/search/search.component';
import { WindowResizeDirective } from '../shared/directives/window-resize.directive';

@Component({
  selector: 'app-navgiation',
  imports: [
    RouterModule,
    ReactiveFormsModule,
    SearchComponent,
    WindowResizeDirective,
  ],
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
