import { Component, inject } from '@angular/core';
import { WishlistService } from '../shared/services/wishlist.service';
import { single_item } from '../shared/interfaces/product.interface';
import { ItemCardComponent } from '../shared/components/item-card/item-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [ItemCardComponent, ItemCardComponent, CommonModule, RouterModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  private readonly wishlistService = inject(WishlistService);

  items: single_item[] = [];
  counter: number = 0;
  totalPrice: number = 0;
  currency_holder: string = '';

  ngOnInit(): void {
    const storedItems = JSON.parse(localStorage.getItem('wishlist') || '[]');

    storedItems.forEach((_ids: string) => {
      this.loadItems(_ids);
    });
  }

  loadItems(_id: string) {
    this.wishlistService.getItems(_id).subscribe((res) => {
      this.currency_holder = res.price.currency;
      this.items.push(res);
      this.counter = this.items.length;
      this.totalPrice += res.price.current;
    });
  }

  removeItem(_id: string) {
    this.items = this.items.filter((item) => item._id !== _id);

    const storageItems = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const updatedItems = storageItems.filter((item: string) => item !== _id);

    localStorage.setItem('wishlist', JSON.stringify(updatedItems));

    this.counter = this.items.length;

    // აკლდება კონკრეტული item ის ფასი reduce მეთოდით
    this.totalPrice = this.items.reduce(
      (acc, item) => acc + item.price.current,
      0
    );
  }

  clearWishlist() {
    localStorage.setItem('wishlist', JSON.stringify([]));
    this.items = [];

    this.counter = 0;
    this.totalPrice = 0;
  }
}
