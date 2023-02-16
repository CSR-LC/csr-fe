import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OpenedFrom } from '@app/shared/constants/personal-info.enum';
import { ValidationService } from '@shared/services/validation/validation.service';
import { ValidationPatterns } from '@shared/constants/validation-patterns';

@Component({
  selector: 'lc-personal-info-modal',
  templateUrl: './personal-info-modal.component.html',
  styleUrls: ['./personal-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoModalComponent {
  personalInfoForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(49)]],
    surname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(49)]],
    phone: [
      '',
      [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        this.validationService.pattern(
          { message: 'Номер телефона должен состоять исключительно из цифр' },
          ValidationPatterns.Numbers,
        ),
      ],
    ],
  });

  readonly openedFrom = OpenedFrom;

  constructor(
    @Inject(MAT_DIALOG_DATA) public source: OpenedFrom,
    private readonly formBuilder: FormBuilder,
    private readonly validationService: ValidationService,
  ) {}
}
