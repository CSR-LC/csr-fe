import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


@Component({
  selector: 'lc-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordResetComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public email: string) {}
}
