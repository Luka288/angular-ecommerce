import { Component, inject } from '@angular/core';
import { WishlistService } from '../shared/services/wishlist.service';
import { single_item } from '../shared/interfaces/product.interface';
import { CartItemComponent } from '../shared/components/cart-item/cart-item.component';
import { ItemCardComponent } from '../shared/components/item-card/item-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [ItemCardComponent, ItemCardComponent, CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  private readonly wishlistService = inject(WishlistService);

  items: single_item[] = [];

  ngOnInit(): void {
    const storedItems = JSON.parse(localStorage.getItem('wishlist') || '[]');

    storedItems.forEach((_ids: string) => {
      this.loadItems(_ids);
    });
  }

  loadItems(_id: string) {
    this.wishlistService.getItems(_id).subscribe((res) => {
      this.items.push(res);
      console.log(res);
    });
  }

  removeItem(_id: string) {
    this.items = this.items.filter((item) => item._id !== _id);

    const storageItems = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const updatedItems = storageItems.filter((item: string) => item !== _id);

    localStorage.setItem('wishlist', JSON.stringify(updatedItems));
  }
}
