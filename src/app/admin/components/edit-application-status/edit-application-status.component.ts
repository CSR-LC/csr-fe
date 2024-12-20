import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationStatusName } from '@app/admin/constants/applications-status-names';
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
  data = inject<ApplicationStatusModalData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject<MatDialogRef<EditApplicationStatusComponent>>(MatDialogRef);
  private readonly validationService = inject(ValidationService);
  private readonly fb = inject(FormBuilder);

  readonly formName = 'application status form';
  equipment?: Equipment;
  statuses: ItemTranslated[] = [];
  rentPeriod = '';
  statusName = '';

  form = this.fb.group({
    newStatusId: [null, Validators.required],
  });

  ngOnInit() {
    const data = this.data;
    this.equipment = data.application.equipments[0];
    this.rentPeriod = data.rentPeriod;
    this.statusName = data.statusTranslation;
    this.statuses = this.getStatuses(data.statuses, data.application.last_status.status);
  }

  getStatuses(statuses: ItemTranslated[], currentStatus: string): ItemTranslated[] {
    return statuses.filter((status) => {
      const name = status.name;
      return name !== currentStatus && name !== ApplicationStatusName.inProgress;
    });
  }

  saveStatus() {
    this.validationService.emitSubmit(this.formName);

    if (this.form.valid) this.dialogRef.close(this.form.value.newStatusId);
  }
}
