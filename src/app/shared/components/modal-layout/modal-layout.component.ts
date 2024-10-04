import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lc-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalLayoutComponent {
  @Input() headerTitle!: string;
  @Input() activeCloseIcon = true;
  @Input() handleCloseByMainLayout = false;
  @Output() closed = new EventEmitter<boolean>();

  constructor(private readonly dialogRef: MatDialogRef<any>) {}

  close() {
    if (!this.handleCloseByMainLayout) this.dialogRef.close(false);
    this.closed.next(true);
  }
}
