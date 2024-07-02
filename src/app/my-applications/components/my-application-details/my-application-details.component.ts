import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lc-my-application-details',
  templateUrl: './my-application-details.component.html',
  styleUrls: ['./my-application-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyApplicationDetailsComponent {}
