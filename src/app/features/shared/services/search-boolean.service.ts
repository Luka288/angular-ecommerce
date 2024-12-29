import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchBooleanService {
  isSearchVisible = new BehaviorSubject<boolean>(false);
  bottomNavSearch = new BehaviorSubject<boolean>(false);
}
