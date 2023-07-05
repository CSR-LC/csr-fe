import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '@shared/services/validation/validation.service';
import { ValidationPatterns } from '@shared/constants/validation-patterns';
import { AppRoutes } from '@app/shared/constants/routes.enum';

@Component({
  selector: 'lc-personal-info-modal',
  templateUrl: './personal-info-modal.component.html',
  styleUrls: ['./personal-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoModalComponent {
  readonly offerPath = `/${AppRoutes.PublicOffer}`;
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
          { message: 'Номер телефона должен состоять из цифр' },
          ValidationPatterns.Numbers,
        ),
      ],
    ],
  });

  constructor(private readonly formBuilder: FormBuilder, private readonly validationService: ValidationService) {}
}
