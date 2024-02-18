import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationStatusModalData } from '@app/admin/types';
import { Equipment } from '@app/catalog/models/equipment';
import { ValidationService } from '@app/shared/services/validation/validation.service';
import { ItemTranslated } from '@app/shared/types';

@Component({
  selector: 'lc-edit-application-status',
  templateUrl: './edit-application-status.component.html',
  styleUrls: ['./edit-application-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditApplicationStatusComponent implements OnInit {
  readonly formName = 'application status form';
  equipment?: Equipment;
  statuses: ItemTranslated[] = [];
  rentPeriod = '';
  statusName = '';

  form = this.fb.group({
    newStatusId: [null, Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ApplicationStatusModalData,
    private readonly dialogRef: MatDialogRef<EditApplicationStatusComponent>,
    private readonly validationService: ValidationService,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit() {
    const data = this.data;
    this.equipment = data.application.equipments[0];
    this.rentPeriod = data.rentPeriod;
    this.statusName = data.statusTranslation;
    this.statuses = data.statuses.filter((status) => status.name !== data.application.last_status.status);
  }

  saveStatus() {
    this.validationService.emitSubmit(this.formName);

    if (this.form.valid) this.dialogRef.close(this.form.value.newStatusId);
  }
}
