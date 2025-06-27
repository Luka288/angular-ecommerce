import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertBody } from '../interfaces/alert.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomAlertService {
  private alertShow = new BehaviorSubject<boolean>(false);
  alertShow$ = this.alertShow.asObservable();

  private alertData = new BehaviorSubject<AlertBody | null>(null);
  alertData$ = this.alertData.asObservable();

  displayAlert(message: string, type: 'success' | 'error' | 'warning') {
    this.alertData.next({ message: message, type: type });
    this.alertShow.next(true);

    setTimeout(() => {
      this.alertShow.next(false);
      this.alertData.next(null);
    }, 3000);
  }
}
