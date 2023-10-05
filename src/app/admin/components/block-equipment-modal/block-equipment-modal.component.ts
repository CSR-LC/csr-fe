import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EquipmentModal } from '@app/admin/constants/equipment-modal.enum';
import { Label } from '@app/admin/constants/label';
import { Equipment } from '@app/catalog/models/equipment';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';

@UntilDestroy
@Component({
  selector: 'lc-block-equipment-modal.',
  templateUrl: './block-equipment-modal.component.html',
  styleUrls: ['./block-equipment-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockEquipmentModalComponent implements OnInit {
  ModalEnum = EquipmentModal;
  LabelEnum = Label;
  inventoryNumber: string = String(this.equipment.inventoryNumber);
  minEndDate!: Date;
  form: UntypedFormGroup = this.fb.group({
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public equipment: Equipment,
    private dialogRef: MatDialogRef<BlockEquipmentModalComponent>,
    private fb: UntypedFormBuilder,
  ) {}

  ngOnInit() {
    this.form
      .get('startDate')
      ?.valueChanges.pipe(untilDestroyed(this))
      .subscribe((startDate) => {
        this.minEndDate = startDate as Date;
      });
  }

  endDateFilter = (d: Date | null): boolean => {
    const endDate = d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : null;
    return endDate ? endDate >= this.minEndDate : !!endDate;
  };

  onClose() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
    }
  }
}
