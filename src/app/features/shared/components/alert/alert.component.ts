import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AlertBody } from '../../interfaces/alert.interface';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() displayAlert: boolean | null = false;
  @Input() alertData: AlertBody | null = null;
}
