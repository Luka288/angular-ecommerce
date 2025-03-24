import { Component, computed, inject, signal } from '@angular/core';
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

  currency_holder = signal<string>('');
  items = signal<single_item[]>([]);
  counter = computed(() => this.items().length);
  totalPrice = computed(() =>
    this.items().reduce((acc, item) => acc + item.price.current, 0)
  );

  ngOnInit(): void {
    const storedItems = JSON.parse(localStorage.getItem('wishlist') || '[]');

    storedItems.forEach((_ids: string) => {
      this.loadItems(_ids);
    });
  }

  loadItems(_id: string) {
    this.wishlistService.getItems(_id).subscribe((res) => {
      this.currency_holder.set(res.price.currency);
      this.items.update((prevItems) => [...prevItems, res]);
    });
  }

  removeItem(_id: string) {
    this.items.update((prevItems) =>
      prevItems.filter((item) => item._id !== _id)
    );

    const storageItems = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const updatedItems = storageItems.filter((item: string) => item !== _id);

    localStorage.setItem('wishlist', JSON.stringify(updatedItems));
  }

  clearWishlist() {
    localStorage.setItem('wishlist', JSON.stringify([]));
    this.items.set([]);
  }
}
