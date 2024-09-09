import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ValidationService } from '@shared/services/validation/validation.service';

@Component({
  selector: 'lc-change-email-modal',
  templateUrl: './change-email-modal.component.html',
  styleUrls: ['./change-email-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeEmailModalComponent {
  readonly formName = 'change_email_modal';
  loginInfoForm = this.formBuilder.group({
    email: [this.email || '', [Validators.required, Validators.maxLength(49), Validators.email]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public email: string,
    private readonly dialogRef: MatDialogRef<ChangeEmailModalComponent>,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly validationService: ValidationService,
  ) {}

  public submit() {
    this.validationService.emitSubmit(this.formName);

    if (!this.loginInfoForm?.valid) return;

    this.dialogRef.close(this.loginInfoForm.value.email);
  }
}
