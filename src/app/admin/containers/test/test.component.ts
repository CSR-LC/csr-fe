import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lc-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent {}
