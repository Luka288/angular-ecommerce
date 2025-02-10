import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  @Output() bottom = new EventEmitter<boolean>();

  timeOut: boolean = false;

  @HostListener('window:scroll', [])
  onScroll() {
    if (window.innerWidth > 768 || this.timeOut) {
      return;
    }

    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;

    if (currentScroll === scrollableHeight) {
      this.timeOut = true;
      this.bottom.emit(true);
      this.timeOut = false;
    }
  }
}
