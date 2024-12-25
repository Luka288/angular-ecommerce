import { Component } from '@angular/core';
import { NavgiationComponent } from './features/navgiation/navgiation.component';
import { BottomNavigationComponent } from './features/bottom-navigation/bottom-navigation.component';

@Component({
  selector: 'app-root',
  imports: [NavgiationComponent, BottomNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerce';
}
