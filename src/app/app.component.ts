import { Component } from '@angular/core';
import { NavgiationComponent } from './features/navgiation/navgiation.component';

@Component({
  selector: 'app-root',
  imports: [NavgiationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerce';
}
