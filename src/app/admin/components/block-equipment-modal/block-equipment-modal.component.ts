import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EquipmentModal } from '@app/admin/constants/equipment-modal.enum';
import { Label } from '@app/admin/constants/label';
import { Equipment } from '@app/catalog/models/equipment';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ValidationService } from '@app/shared/services/validation/validation.service';
import { DateRangeService } from '@app/features/date-range/services';
import { DateRangePurpose } from '@app/features/date-range/models/date-rrange-purpose';
import { UnavailableDates, DateRangeData } from '@app/features/date-range/models';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';
import { Period } from '@app/shared/models/period';

@UntilDestroy
@Component({
  selector: 'lc-block-equipment-modal.',
  templateUrl: './block-equipment-modal.component.html',
  styleUrls: ['./block-equipment-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockEquipmentModalComponent implements OnInit {
  readonly formName = 'block_equipment_modal';
  equipment?: Equipment;
  unavailablePeriods: UnavailableDates[] = [];
  ModalEnum = EquipmentModal;
  LabelEnum = Label;
  minDate: Date | null = null;
  form: UntypedFormGroup = this.fb.group({
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialogRef: MatDialogRef<BlockEquipmentModalComponent>,
    private fb: UntypedFormBuilder,
    private validationService: ValidationService,
    private readonly dateRangeService: DateRangeService,
  ) {}

  ngOnInit() {
    this.equipment = this.dialogData.equipment;
    this.unavailablePeriods = this.dialogData.unavailablePeriods;
    this.minDate = new Date();
  }

  blockEquipment() {
    this.validationService.emitSubmit(this.formName);
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
    }
  }

  openDatePicker() {
    this.dateRangeService
      .openDateRangeModal(this.dateRangeConfig)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        if (!res) return;
        this.setFormValue({
          startDate: new Date(res.start_date),
          endDate: new Date(res.end_date),
        });
      });
  }

  private setFormValue(value: Period) {
    this.form.setValue(value);
  }

  private get dateRangeConfig(): DateRangeData {
    return {
      headerText: 'Выберите период блокировки',
      buttonText: 'выбрать',
      maxRentalPeriod: 14,
      unavailableDates: this.unavailablePeriods,
      purpose: DateRangePurpose.block,
    };
  }
}
