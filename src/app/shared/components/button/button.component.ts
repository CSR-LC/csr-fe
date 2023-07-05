import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() color?: 'primary' | 'warn' | 'accent' = 'primary';
  @Input() disabled?: boolean = false;
  @Input() type?: 'button' | 'submit' = 'button';

  constructor() {}
}
