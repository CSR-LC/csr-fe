import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'lc-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent extends ButtonComponent {
  @Input() iconName: string = '';

  constructor() {
    super();
  }
}
