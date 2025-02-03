import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { products } from '../../interfaces/product.interface';
import { TruncatePipe } from '../../pipes/Truncate.pipe';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TransformCurrencyPipe } from '../../pipes/transform-currency.pipe';
import { _getOptionScrollPosition } from '@angular/material/core';
import { AuthService } from '../../services/auth.service';
import { AlertsServiceService } from '../../services/alerts-service.service';

@Component({
  selector: 'app-card',
  imports: [
    TruncatePipe,
    RouterLink,
    CardModule,
    ButtonModule,
    TransformCurrencyPipe,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly alerts = inject(AlertsServiceService);

  currentUserState: boolean = false;

  @Input({ alias: 'singleItem' }) item!: products;
  @Output() cartItemId = new EventEmitter<string>();
  @Output() wishlist = new EventEmitter<string>();

  constructor() {
    this.checkUserState();
  }

  checkUserState(): boolean {
    this.authService.authState$.subscribe((res) => {
      if (res === true) {
        console.log(res);
        this.currentUserState = true;
      }
    });

    return this.currentUserState;
  }

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  prevent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  emitItem(_id: string) {
    this.cartItemId.emit(_id);
  }

  emitwishlistedItem(_id: string) {
    this.wishlist.emit(_id);
  }

  // გადაყავს მომხმარებელი ავტორიზაციის ფეიჯზე თუ
  // არაა ავტორიზირებული და ამატებს პროდუქტს კარტაზე
  redirect() {
    this.router.navigateByUrl('/auth');
    this.alerts.toast('You must authorize first', 'error', '');
  }
}
