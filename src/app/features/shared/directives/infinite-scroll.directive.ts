import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  @Output() bottom = new EventEmitter<boolean>();

  userDevice = /Android|iPhone|iPad|iPod|Windows Phone/i.test(
    navigator.userAgent
  );

  timeOut: boolean = false;

  @HostListener('window:scroll', [])
  onScroll() {
    if (!this.userDevice) {
      return;
    }

    // ინახება დოკუმენტის სრული სქროლის სიმაღლე
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // დოკუმენტის სქროლის პოზიცია
    const currScroll = window.scrollY;

    // თუ მაქსიმალური სქროლის სიმაღლე და მომხმარებლის
    // სქროლის სიმაღლე გაუტოლდება ერთმანეთს ანუ თუ მომხმარებელი
    // ბოლომდე ჩამოსქროლავს დირექტივა emit გაუკთებს true რაც უკვე
    // მთავარ კომპონენტში იძახებს ფუნქციას სადაც პროდუქტები იტვირთება
    if (currScroll === scrollHeight) {
      this.timeOut = true;
      this.bottom.emit(true);
      this.timeOut = false;
    }
  }
}
