import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lc-change-email-modal',
  templateUrl: './change-email-modal.component.html',
  styleUrls: ['./change-email-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeEmailModalComponent {
  loginInfoForm = this.formBuilder.group({
    email: [this.email || '', [Validators.required, Validators.maxLength(49), Validators.email]],
  });

  constructor(private readonly formBuilder: UntypedFormBuilder, @Inject(MAT_DIALOG_DATA) public email: string) {}
}
