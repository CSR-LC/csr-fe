import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lc-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalLayoutComponent {
  @Input() headerTitle!: string;
  @Output() closed = new EventEmitter<boolean>();

  constructor() {}

  close() {
    this.closed.next(true);
  }
}
