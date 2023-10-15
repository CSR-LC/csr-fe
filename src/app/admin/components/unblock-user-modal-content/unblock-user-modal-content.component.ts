import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '@app/auth/models';
import { UserModal } from '@app/admin/constants/user-modal.enum';

@Component({
  selector: 'lc-unblock-user-modal-content',
  templateUrl: './unblock-user-modal-content.component.html',
  styleUrls: ['./unblock-user-modal-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnblockUserModalContentComponent {
  @Input()
  user!: User;
  ModalEnum = UserModal;
}
