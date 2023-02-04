import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OpenedFrom } from '@app/shared/constants/personal-info.enum';
import { UserPersonalInfo } from '@shared/constants/personal-info';

@Component({
  selector: 'lc-personal-info-modal',
  templateUrl: './personal-info-modal.component.html',
  styleUrls: ['./personal-info-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoModalComponent {
  readonly openedFrom = OpenedFrom;
  contacts: UserPersonalInfo = {
    name: '',
    surname: '',
    phone: '',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public source: OpenedFrom) {}
}
