import { ChangeDetectionStrategy, Component, Inject, Type } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModalData } from '@shared/models';

@Component({
  selector: 'lc-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent {
  title: string = this.confirmationModalData.title;
  body?: string = this.confirmationModalData.body;
  contentComponent?: Type<unknown> = this.confirmationModalData.contentComponent;
  contentComponentData?: Record<string, unknown> = this.confirmationModalData.contentComponentData;
  applyButtonText?: string = this.confirmationModalData.applyButtonText;
  cancelButtonText?: string = this.confirmationModalData.cancelButtonText;

  constructor(
    @Inject(MAT_DIALOG_DATA) public confirmationModalData: ConfirmationModalData,
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }
}
