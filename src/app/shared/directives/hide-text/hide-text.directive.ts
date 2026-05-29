import { Directive, ElementRef, OnInit, AfterViewInit, Renderer2, inject } from '@angular/core';
import { EyeIconClasses, InputType } from '@shared/constants';

@Directive({
  selector: '[lcHideText]',
})
export class HideTextDirective implements OnInit, AfterViewInit {
  private readonly element = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  private eyeIconClasses = [EyeIconClasses.open, EyeIconClasses.closed];

  ngOnInit() {
    this.createIcon();
  }

  ngAfterViewInit() {
    this.renderer.setAttribute(this.element.nativeElement, 'type', InputType.password);
  }

  get hostParent(): Element {
    return this.element.nativeElement.parentElement;
  }

  get hostTypeAttribute(): string {
    return this.element.nativeElement.getAttribute('type');
  }

  private createIcon() {
    const icon = this.renderer.createElement('span');
    this.renderer.addClass(icon, 'hide-text-icon');
    this.renderer.addClass(icon, EyeIconClasses.open);
    this.renderer.setStyle(this.hostParent, 'position', 'relative');
    this.renderer.listen(icon, 'click', this.togglePasswordVisibility);
    this.renderer.appendChild(this.element.nativeElement.parentElement, icon);
  }

  private togglePasswordVisibility = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const nextValue = this.hostTypeAttribute === InputType.password ? InputType.text : InputType.password;

    this.renderer.setAttribute(this.element.nativeElement, 'type', nextValue);
    this.changeIcon(event.target, nextValue);
  };

  changeIcon(icon: EventTarget | null, nextTypeValue: InputType) {
    if (!icon) return;

    this.eyeIconClasses.forEach((className) => this.renderer.removeClass(icon, className));

    const nextClassName = nextTypeValue === InputType.password ? EyeIconClasses.open : EyeIconClasses.closed;

    this.renderer.addClass(icon, nextClassName);
  }
}
