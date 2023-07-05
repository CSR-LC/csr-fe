import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';

@Component({
  selector: 'lc-raised-button',
  templateUrl: './raised-button.component.html',
  styleUrls: ['./raised-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaisedButtonComponent extends ButtonComponent {
  constructor() {
    super();
  }
}
