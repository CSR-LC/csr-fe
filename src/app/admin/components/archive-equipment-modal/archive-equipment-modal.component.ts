import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentModal } from '@app/admin/constants/equipment-modal.enum';
import { Equipment } from '@app/catalog/models/equipment';

@Component({
  selector: 'lc-archive-equipment-modal',
  templateUrl: './archive-equipment-modal.component.html',
  styleUrls: ['./archive-equipment-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveEquipmentModalComponent {
  equipment = inject<Equipment>(MAT_DIALOG_DATA);

  ModalEnum = EquipmentModal;
  inventoryNumber: string = String(this.equipment.inventoryNumber);
}
