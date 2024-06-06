import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '@shared/services/validation/validation.service';
import { ValidationPatterns } from '@shared/constants/validation-patterns';
import { AppRoutes } from '@app/shared/constants/routes.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserPersonalInfo } from '@shared/constants/personal-info';

@Component({
  selector: 'lc-personal-info-modal',
  templateUrl: './personal-info-modal.component.html',
  styleUrls: ['./personal-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoModalComponent {
  readonly formName = 'personal_info_modal';
  readonly offerPath = `/${AppRoutes.PublicOffer}`;
  personalInfoForm = this.formBuilder.group({
    name: [this.contactInfo?.name || '', [Validators.required, Validators.minLength(2), Validators.maxLength(49)]],
    surname: [
      this.contactInfo?.surname || '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(49)],
    ],
    phone_number: [
      this.contactInfo?.phone_number || '',
      [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        this.validationService.getPatternValidator(
          { message: 'Номер телефона должен состоять из цифр' },
          ValidationPatterns.Numbers,
        ),
      ],
    ],
  });

  constructor(
    private readonly formBuilder: UntypedFormBuilder,
    private readonly validationService: ValidationService,
    private readonly dialogRef: MatDialogRef<PersonalInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public contactInfo?: UserPersonalInfo,
  ) {}

  public submit() {
    this.validationService.emitSubmit(this.formName);

    if (!this.personalInfoForm?.valid) return;

    this.dialogRef.close(this.personalInfoForm.value);
  }
}
