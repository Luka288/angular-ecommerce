import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { ProductsService } from './products.service';
import { BehaviorSubject, forkJoin, switchMap } from 'rxjs';
import { products } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class SaveItemsService {
  private readonly productServ = inject(ProductsService);

  private productsSub = new BehaviorSubject<products[]>([]);
  productsStream = this.productsSub.asObservable();

  // სერვისი ინახავს პროდუქტების აიდებს ლოკალ სთორიჯში
  savedItems: string[] = [];

  constructor() {
    this.loadFromServer();
  }

  loadFromServer() {
    of(this.getSavedItems())
      .pipe(
        switchMap((ids) =>
          ids.length
            ? forkJoin(
                ids.map((id: string) => this.productServ.productWithId(id))
              )
            : of([])
        )
      )
      .subscribe((value) => this.productsSub.next(value as products[]));
  }

  saveItems(_id?: string): void {
    if (this.savedItems.includes(_id!)) {
      return;
    }

    if (this.savedItems.length === 3) {
      this.savedItems.pop();
    }

    this.savedItems.unshift(_id!);
    localStorage.setItem('savedItems', JSON.stringify([...this.savedItems]));

    this.loadFromServer();
  }

  getSavedItems() {
    return JSON.parse(localStorage.getItem('savedItems') || '[]');
  }
}
