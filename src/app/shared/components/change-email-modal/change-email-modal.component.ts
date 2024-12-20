import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  email = inject(MAT_DIALOG_DATA);
  private readonly dialogRef = inject<MatDialogRef<ChangeEmailModalComponent>>(MatDialogRef);
  private readonly formBuilder = inject(UntypedFormBuilder);
  private readonly validationService = inject(ValidationService);

  readonly formName = 'change_email_modal';
  loginInfoForm = this.formBuilder.group({
    email: [this.email || '', [Validators.required, Validators.maxLength(49), Validators.email]],
  });

  public submit() {
    this.validationService.emitSubmit(this.formName);

    if (!this.loginInfoForm?.valid) return;

    this.dialogRef.close(this.loginInfoForm.value.email);
  }
}
