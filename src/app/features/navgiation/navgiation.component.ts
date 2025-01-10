import { Component, inject, SimpleChange, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authNav, baseNav } from '../shared/consts/consts';
import { navigation } from '../shared/interfaces/navigation.interface';
import { SearchComponent } from '../shared/components/search/search.component';
import { WindowResizeDirective } from '../shared/directives/window-resize.directive';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AuthService } from '../shared/services/auth.service';
import { userTokenEnum } from '../shared/enums/token.enums';

@Component({
  selector: 'app-navgiation',
  imports: [
    RouterModule,
    SearchComponent,
    WindowResizeDirective,
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
  ],
  templateUrl: './navgiation.component.html',
  styleUrl: './navgiation.component.scss',
})
export class NavgiationComponent {
  private readonly authService = inject(AuthService);

  toggleNav: boolean = false;
  base_nav: navigation[] = baseNav;
  signed_nav: navigation[] = authNav;
  currentNav: navigation[] = baseNav;

  constructor() {
    this.authService.authState$.subscribe((state) => {
      this.currentNav = state ? this.signed_nav : this.base_nav;
    });
  }

  toggleF() {
    this.toggleNav = !this.toggleNav;
  }

  logOut(ev: MouseEvent) {
    this.authService.logOut();
  }
}
