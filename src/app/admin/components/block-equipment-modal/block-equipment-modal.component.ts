import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabelEnum, ModalEnum } from '@app/admin/constants/modal.enum';
import { Equipment } from '@app/catalog/models/equipment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lc-block-equipment-modal.',
  templateUrl: './block-equipment-modal.component.html',
  styleUrls: ['./block-equipment-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockEquipmentModalComponent {
  ModalEnum = ModalEnum;
  LabelEnum = LabelEnum;
  inventoryNumber: string = String(this.equipment.inventoryNumber);
  form: FormGroup = this.fb.group({
    startDate: [null],
    endDate: [null],
  });
  constructor(@Inject(MAT_DIALOG_DATA) public equipment: Equipment, private fb: FormBuilder) {}
}
