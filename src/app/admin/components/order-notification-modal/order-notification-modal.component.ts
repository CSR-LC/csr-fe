import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
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
  action = inject<EquipmentAction.Block | EquipmentAction.Archivate>(MAT_DIALOG_DATA);

  actions = EquipmentAction;
  header = '';
  actionText = '';

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
