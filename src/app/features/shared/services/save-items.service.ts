import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class SaveItemsService {
  // სერვისი ინახავს პროდუქტების აიდებს ლოკალ სთორიჯში
  savedItems: string[] = [];

  saveItems(_id?: string): void {
    if (this.savedItems.includes(_id!)) {
      return;
    }

    if (this.savedItems.length === 3) {
      this.savedItems.pop();
    }

    this.savedItems.unshift(_id!);
    localStorage.setItem('savedItems', JSON.stringify([...this.savedItems]));
  }

  getSavedItems() {
    const savedItems = localStorage.getItem('savedItems');
    return of(savedItems ? JSON.parse(savedItems) : []).pipe();
  }
}
