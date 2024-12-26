import { Component } from '@angular/core';
import { NavgiationComponent } from './features/navgiation/navgiation.component';
import { BottomNavigationComponent } from './features/bottom-navigation/bottom-navigation.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavgiationComponent, BottomNavigationComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
