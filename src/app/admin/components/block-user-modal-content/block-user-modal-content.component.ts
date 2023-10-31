import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from '@app/auth/models';
import { UserModal } from '@app/admin/constants/user-modal.enum';

@Component({
  selector: 'lc-block-user-modal-content',
  templateUrl: './block-user-modal-content.component.html',
  styleUrls: ['./block-user-modal-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockUserModalContentComponent implements OnInit {
  @Input() data?: User;
  ModalEnum = UserModal;
  user?: User;
  isUserBlocked = false;

  ngOnInit() {
    if (this.data) {
      this.user = this.data;
      this.isUserBlocked = this.user.is_readonly;
    }
  }
}
