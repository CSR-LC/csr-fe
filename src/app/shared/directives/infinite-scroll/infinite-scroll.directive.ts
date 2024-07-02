import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[lcInfiniteScroll]',
})
export class InfiniteScrollDirective {
  @Output() scrolled = new EventEmitter<void>();
  @Input() threshold = 100;

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const scrollPosition = target.scrollHeight - target.scrollTop - target.clientHeight;
    if (scrollPosition <= this.threshold) {
      this.scrolled.emit();
    }
  }
}
