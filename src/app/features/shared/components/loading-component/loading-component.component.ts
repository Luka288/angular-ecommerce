import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading-component',
  imports: [ProgressSpinnerModule],
  templateUrl: './loading-component.component.html',
  styleUrl: './loading-component.component.scss',
})
export class LoadingComponentComponent {}
