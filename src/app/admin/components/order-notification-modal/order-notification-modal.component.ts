import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentModal } from '@app/admin/constants/equipment-modal.enum';
import { EquipmentAction } from '@app/shared/constants/equipment-action.enum';

@Component({
  selector: 'lc-order-notification-modal',
  templateUrl: './order-notification-modal.component.html',
  styleUrls: ['./order-notification-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderNotificationModalComponent implements OnInit {
  actions = EquipmentAction;
  header = '';
  actionText = '';

  constructor(@Inject(MAT_DIALOG_DATA) public action: EquipmentAction.Block | EquipmentAction.Archivate) {}

  ngOnInit() {
    switch (this.action) {
      case this.actions.Block:
        this.header = EquipmentModal.BlockTitle;
        this.actionText = EquipmentModal.BlockApplyButtonText;
        break;
      case this.actions.Archivate:
        this.header = EquipmentModal.ArchiveTitle;
        this.actionText = EquipmentModal.ArchiveApplyButtonText;
        break;
    }
  }
}
