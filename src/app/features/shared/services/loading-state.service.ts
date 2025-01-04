import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingStateService {
  private loadingState = new BehaviorSubject<boolean>(false);
  loading = this.loadingState.asObservable();

  show() {
    this.loadingState.next(true);
  }

  hide() {
    this.loadingState.next(false);
  }
}
