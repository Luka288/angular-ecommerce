import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  @Output() bottom = new EventEmitter<boolean>();

  timeOut: boolean = false;

  // ჰოსტ ლისტენერი სქროლის გასაკონტროლებლად აბრუმენს
  // true იმ შემთხვევაში როცა window სიგანე არის 768px ან ნაკლები
  // გათვლილია მხოლოდ ტელეფონის ეკრანებზე
  @HostListener('window:scroll', [])
  onScroll() {
    if (window.innerWidth > 768 || this.timeOut) {
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
