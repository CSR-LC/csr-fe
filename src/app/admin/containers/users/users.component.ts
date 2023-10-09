import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableColumn } from '@shared/models/table-column';
import { USER_COLUMNS } from '@app/admin/constants/user-columns';
import { Observable } from 'rxjs';
import { UserController } from '@app/admin/services';
import { User } from '@app/admin/models/user';

@Component({
  selector: 'lc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserController],
})
export class UsersComponent implements OnInit {
  columns: TableColumn[] = USER_COLUMNS;
  users$: Observable<User[]> = this.controller.users$;

  constructor(private controller: UserController) {}

  ngOnInit() {
    this.controller.fetchUsers().subscribe();
  }
}
