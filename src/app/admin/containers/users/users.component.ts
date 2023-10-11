import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableColumn } from '@shared/models/table-column';
import { USER_COLUMNS } from '@app/admin/constants/user-columns';
import { Observable } from 'rxjs';
import { UserControllerService } from '@app/admin/services';
import { User } from '@app/auth/models';

@Component({
  selector: 'lc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserControllerService],
})
export class UsersComponent implements OnInit {
  columns: TableColumn[] = USER_COLUMNS;
  users$: Observable<User[]> = this.controller.users$;

  constructor(private controller: UserControllerService) {}

  ngOnInit() {
    this.controller.fetchUsers().subscribe();
  }
}
