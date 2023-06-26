import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'lc-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalLayoutComponent {
  @Input() headerTitle!: string;

  constructor() {}
}
