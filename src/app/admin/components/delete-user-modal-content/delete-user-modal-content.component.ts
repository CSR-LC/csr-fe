import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from '@app/auth/models';
import { UserModal } from '@app/admin/constants/user-modal.enum';

@Component({
  selector: 'lc-delete-user-modal-content',
  templateUrl: './delete-user-modal-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteUserModalContentComponent implements OnInit {
  @Input() data?: User;
  ModalEnum = UserModal;
  user?: User;

  ngOnInit() {
    if (this.data) {
      this.user = this.data;
    }
  }
}
