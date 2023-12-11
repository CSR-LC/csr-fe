import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableColumn } from '@shared/models/table-column';
import { Observable } from 'rxjs/internal/Observable';
import { TableRow } from '@shared/models/table-row';
import { Select } from '@ngxs/store';
import { ApplicationDataState } from '@shared/store/application-data';
import { Category } from '@app/catalog/models';
import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { TableAction } from '@shared/models/table-action';
import { RolesController } from '@app/admin/services';
import { ROLES_COLUMNS } from '@app/admin/constants/roles-columns';
import { User } from '@app/auth/models';

@Component({
  selector: 'lc-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [RolesController],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RolesComponent implements OnInit {
  columns: TableColumn[] = ROLES_COLUMNS;
  data$: Observable<TableRow[]> = this.controller.roles$;

  @Select(ApplicationDataState.equipmentCategories) equipmentCategories!: Observable<Category[]>;
  @Select(ApplicationDataState.equipmentStatuses) equipmentStatuses!: Observable<EquipmentStatus[]>;

  constructor(private readonly controller: RolesController) {}

  ngOnInit() {
    this.controller.setPageTitle();
    this.controller.fetchRoles().subscribe();
  }

  editRole(data: TableAction<User>) {
    this.controller.manageEvent(data);
  }

  addNewRole() {}
}
