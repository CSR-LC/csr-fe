import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { UserModal } from '@app/admin/constants/user-modal.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlockUserModalData } from '@app/admin/types/block-user-modal-data';
import { BlockUserAction } from '@app/admin/constants/block-user-action.enum';

@Component({
  selector: 'lc-block-user-modal',
  templateUrl: './block-user-modal.component.html',
  styleUrls: ['./block-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockUserModalComponent {
  ModalEnum = UserModal;
  ActionEnum = BlockUserAction;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BlockUserModalData,
    private dialogRef: MatDialogRef<BlockUserModalComponent>,
  ) {}

  blockUser() {
    this.dialogRef.close(true);
  }
}
