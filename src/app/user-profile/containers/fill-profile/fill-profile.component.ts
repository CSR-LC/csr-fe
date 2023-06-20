import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { OnSubmitStateMatcher } from '@shared/error-matcher/on-submit.error-matcher';
import { User } from '../../models/user';
import { UserController } from '../../services';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';

@Component({
  selector: 'lc-fill-profile',
  templateUrl: './fill-profile.component.html',
  styleUrls: ['./fill-profile.component.less'],
  providers: [UserController, { provide: ErrorStateMatcher, useClass: OnSubmitStateMatcher }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FillProfileComponent {
  isFormSubmitted = false;

  activeAreas = this.loadActiveAreas();

  constructor(
    private readonly controller: UserController,
    private readonly mainPageHeaderService: MainPageHeaderService,
  ) {
    this.mainPageHeaderService.setPageTitle('Профиль');
  }

  userInfoForm = new FormGroup({
    surname: new FormControl('', [Validators.required, Validators.maxLength(49), Validators.pattern(/^[-а-яА-ЯёЁ]+$/)]),
    name: new FormControl('', [Validators.required, Validators.maxLength(49), Validators.pattern(/^[-а-яА-ЯёЁ]+$/)]),
    patronymic: new FormControl('', [Validators.maxLength(49), Validators.pattern(/^[-а-яА-ЯёЁ]+$/)]),
    documentNumber: new FormControl('', [Validators.required, Validators.maxLength(49)]),
    documentIssuingInfo: new FormControl('', [
      Validators.required,
      Validators.maxLength(149),
      Validators.pattern(/^[-а-яА-ЯёЁ]+$/),
    ]),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(24)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(49), Validators.email]),
    status: new FormControl(''),
    organizationName: new FormControl('', [Validators.maxLength(149)]),
    organizationContact: new FormControl('', [Validators.maxLength(149)]),
    personalAccount: new FormControl('', [Validators.maxLength(149)]),
    workDistrict: new FormControl(''),
  });

  disableKeyboardInput(event: KeyboardEvent, formFieldName: string) {
    if (event.key === 'Backspace') return;
    const formField = this.userInfoForm.get(formFieldName);
    return !(formField?.errors && (formField.errors['maxlength'] || formField.errors['max']));
  }

  onCancel() {
    this.controller.cancel(this.userInfoForm);
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.userInfoForm.valid) {
      const formValue = this.userInfoForm.value;
      const user: User = {
        surname: formValue.surname,
        name: formValue.name,
        patronymic: formValue.patronymic,
        documentNumber: formValue.documentNumber,
        documentIssuingInfo: formValue.documentIssuingInfo,
        phoneNumber: formValue.phoneNumber,
        email: formValue.email,
        status: formValue.status,
        organizationName: formValue.organizationName,
        organizationContact: formValue.organizationContact,
        personalAccount: formValue.personalAccount,
        activeArea: formValue.workDistrict,
      };
      this.controller.fillProfile(user);
    }
  }

  // TODO: add user statuses loading once BE provides the endpoint

  private loadActiveAreas() {
    return this.controller.loadActiveAreas();
  }
}
