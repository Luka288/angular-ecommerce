import { Component, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { baseNav } from '../shared/consts/consts';
import { navigation } from '../core/interfaces/navigation.interface';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navgiation',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './navgiation.component.html',
  styleUrl: './navgiation.component.scss',
})
export class NavgiationComponent {
  toggleNav: boolean = false;
  base_nav: navigation[] = baseNav;

  searchControl = new FormControl('');

  toggleF() {
    this.toggleNav = !this.toggleNav;

    console.log(this.toggleNav);
  }
}
