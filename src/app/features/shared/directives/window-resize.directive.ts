import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appWindowResize]',
})
export class WindowResizeDirective {
  @Input() windowSize: number = 768;
  @Input() removeClass: string = '';
  @Input() setClass: string = '';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  @HostListener('window:resize', ['$event']) onResize(e: Event) {
    const windowWidth = (e.target as Window).innerWidth;
    if (windowWidth > this.windowSize) {
      this.renderer.removeClass(
        this.elementRef.nativeElement,
        this.removeClass
      );
    }

    if (windowWidth > this.windowSize && this.removeClass && this.setClass) {
      this.renderer.removeClass(
        this.elementRef.nativeElement,
        this.removeClass
      );
      this.renderer.addClass(this.elementRef.nativeElement, this.setClass);
    }
  }
}
