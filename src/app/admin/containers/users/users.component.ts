import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableColumn } from '@shared/models/table-column';
import { USER_COLUMNS } from '@app/admin/constants/user-columns';
import { Observable } from 'rxjs';
import { UserControllerService } from '@app/admin/services';
import { User } from '@app/auth/models';
import { TableAction } from '@shared/models/table-action';
import { TableRow } from '@shared/models/table-row';
import { AdminPagesTitles } from '@app/admin/constants/admin-pages-titles.enum';
import { TableFilterService } from '@app/admin/services/table-filter/table-filter.service';

@Component({
  selector: 'lc-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserControllerService, TableFilterService],
})
export class UsersComponent implements OnInit {
  columns: TableColumn[] = USER_COLUMNS;
  users$: Observable<TableRow[]> = this.controller.users$;

  constructor(private controller: UserControllerService, private tableFilterService: TableFilterService) {}

  ngOnInit() {
    this.controller.fetchUsers().subscribe(() => {
      this.tableFilterService.setInitialOptions(this.controller.users);
    });

    this.controller.setPageTitle(AdminPagesTitles.Users);
    this.tableFilterService.filteredOptions$.subscribe((options) => {
      this.controller.setUsers(options);
    });
  }

  editUser(data: TableAction<User>) {
    this.controller.editUser(data);
  }
}
