import {ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lc-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {
  @Input() pageTitle!: string;
}
