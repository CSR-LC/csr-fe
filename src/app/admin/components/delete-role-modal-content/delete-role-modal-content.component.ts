import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RoleModal } from '@app/admin/constants/role-modal.enum';
import { User } from '@app/auth/models';

@Component({
  selector: 'lc-delete-role-modal-content',
  templateUrl: './delete-role-modal-content.component.html',
  styleUrls: ['./delete-role-modal-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteRoleModalContentComponent implements OnInit {
  @Input() data?: User;
  ModalEnum = RoleModal;
  user?: User;

  ngOnInit() {
    if (this.data) {
      this.user = this.data;
    }
  }
}
