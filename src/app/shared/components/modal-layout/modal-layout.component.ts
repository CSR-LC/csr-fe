import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lc-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalLayoutComponent {
  private readonly dialogRef = inject<MatDialogRef<any>>(MatDialogRef);

  @Input() headerTitle!: string;
  @Input() activeCloseIcon = true;
  @Input() handleCloseByMainLayout = false;
  @Output() closed = new EventEmitter<boolean>();

  close() {
    if (!this.handleCloseByMainLayout) this.dialogRef.close(false);
    this.closed.next(true);
  }
}
