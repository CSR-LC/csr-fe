import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors } from '@angular/forms';
import { ValidationService } from '../../services/validation/validation.service';
import { Subject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';

@UntilDestroy
@Directive({
  selector: '[lcValidationErrors]',
})
export class ValidationErrorsDirective implements OnInit, OnDestroy {
  @Input() lcValidationErrors?: string;

  private errorsElement?: Element;
  private readonly destroy$ = new Subject();
  private controlWrapper?: Element | null;

  constructor(
    private readonly element: ElementRef,
    private readonly ngControl: NgControl,
    private readonly renderer: Renderer2,
    private readonly validationService: ValidationService,
  ) {}

  ngOnInit(): void {
    this.setControlWrapper();
    this.validationService
      .getSubmitObservable()
      .pipe(untilDestroyed(this))
      .subscribe((formName) => {
        this.removeErrors();
        if (!this.lcValidationErrors) this.createErrors();
        if (formName && this.lcValidationErrors && (formName as string) === this.lcValidationErrors)
          this.createErrors();
      });

    this.control.statusChanges.pipe(untilDestroyed(this)).subscribe(() => {
      this.removeErrors();
      if (this.control.errors) this.createErrors();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
  }

  setControlWrapper() {
    this.controlWrapper = this.element.nativeElement.closest('.mat-mdc-form-field');
  }

  get control(): AbstractControl {
    return this.ngControl.control as AbstractControl;
  }

  private createErrors(): void {
    if (!this.control.errors) return;

    this.renderErrors(this.getErrorMessages(this.control.errors));
  }

  private getErrorMessages(errors: ValidationErrors): string[] {
    const errorMessages: string[] = [];
    for (const [key, error] of Object.entries(errors)) {
      let errorText = error.message ? error.message : this.validationService.getErrorTextByKey(key);
      if (errorText) {
        errorMessages.push(errorText);
        return errorMessages;
      }
    }
    return errorMessages;
  }

  private renderErrors(errors: string[]): void {
    if (!this.controlWrapper) return;
    if (!errors.length) return;
    const errorsContainer = this.renderer.createElement('div');
    this.renderer.addClass(errorsContainer, 'lc-error');

    errors.forEach((errorText) => {
      this.renderer.appendChild(errorsContainer, this.createError(errorText));
    });

    this.errorsElement = errorsContainer;
    this.renderer.appendChild(this.controlWrapper, this.errorsElement);
  }

  private createError(errorText: string): Element {
    const error = this.renderer.createElement('mat-error');
    this.renderer.addClass(error, 'mat-error');
    this.renderer.appendChild(error, this.renderer.createText(errorText));
    return error;
  }

  private removeErrors(): void {
    if (!this.errorsElement || !this.controlWrapper) return;
    this.renderer.removeChild(this.controlWrapper, this.errorsElement);
    this.errorsElement = undefined;
  }
}
