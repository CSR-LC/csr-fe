import { ChangeDetectionStrategy, Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lc-consent',
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ConsentComponent)
    }
  ]
})
export class ConsentComponent implements ControlValueAccessor, OnInit {
  @Input() text: string = "";
  isCheckedValue: boolean = false;

  @Input() set value(value: boolean){
    this.isCheckedValue = value;
  }
  get value(): boolean {
    return this.isCheckedValue;
  }

  constructor() { }

  touched = false;
  disabled = false;
  
  onChange: any = () => {};
  onTouched: any = () => {};
  
  writeValue(value: boolean) : void {
    this.isCheckedValue = value;
  }

  registerOnChange(onChange: any) : void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) : void {
    this.onTouched = onTouched;
  }

  markAsTouched() : void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) : void {
    this.disabled = disabled;
  }

  onClick() : void {
    console.log("Здесь будет модальное окно!");
  }

  ngOnInit(): void { }
}
