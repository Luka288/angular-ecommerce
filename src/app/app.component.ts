import { Component, inject } from '@angular/core';
import { NavgiationComponent } from './features/navgiation/navgiation.component';
import { BottomNavigationComponent } from './features/bottom-navigation/bottom-navigation.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './features/shared/components/alert/alert.component';
import { CustomAlertService } from './features/shared/services/custom-alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NavgiationComponent,
    BottomNavigationComponent,
    RouterModule,
    AlertComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly customAlerts = inject(CustomAlertService);

  alertData = this.customAlerts.alertData$;
  showAlert = this.customAlerts.alertShow$;
}
