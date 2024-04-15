import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lc-error-page-layout',
  templateUrl: './error-page-layout.component.html',
  styleUrls: ['./error-page-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageLayoutComponent {
  @Input() headerText: string = '';
  @Input() message: string = '';
}
