import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '@app/user-profile/models/user';
import { ConfirmationModalData } from '@shared/models/confirmation-modal';

@Component({
  selector: 'lc-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent {
  title: string = this.confirmationModalData.title;
  users: User[] = this.confirmationModalData.users;
  reason: string = this.confirmationModalData.reason;
  applyButtonText: string = this.confirmationModalData?.applyButtonText
    ? this.confirmationModalData?.applyButtonText
    : 'Подтвердить';
  cancelButtonText: string = this.confirmationModalData?.cancelButtonText
    ? this.confirmationModalData?.cancelButtonText
    : 'Отменить';
  constructor(@Inject(MAT_DIALOG_DATA) public confirmationModalData: ConfirmationModalData) {}
}
