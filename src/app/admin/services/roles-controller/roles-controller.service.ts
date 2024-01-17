import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { BehaviorSubject, filter, Observable, switchMap, tap } from 'rxjs';
import { TableRow } from '@shared/models/table-row';
import { AdminApi } from '@app/admin/services';
import { NotificationsService } from '@shared/services/notifications/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { BaseItemsResponse } from '@shared/types';
import { User } from '@app/auth/models';
import { TableAction } from '@shared/models/table-action';
import { ADMIN_MODAL_CONFIG, UserModal } from '@app/admin/constants';
import { ConfirmationModalComponent } from '@shared/components';
import { RoleAction } from '@shared/constants/role-action';
import { RoleNotification } from '@app/admin/constants/role-notification';
import { RoleModal } from '@app/admin/constants/role-modal.enum';
import { AssignRoleModalComponent, DeleteRoleModalContentComponent } from '@app/admin/components';
import { Store } from '@ngxs/store';
import { ApplicationDataState } from '@shared/store/application-data';
import { Role } from '@app/auth/models/role';
import { AssignRoleModalResult } from '@app/admin/types/assign-role-modal-result';

@UntilDestroy
@Injectable()
export class RolesController {
  private rolesSubject$ = new BehaviorSubject<TableRow[]>([]);
  private roles = this.store.selectSnapshot(ApplicationDataState).roles;
  private users: User[] = [];

  constructor(
    private api: AdminApi,
    private notificationService: NotificationsService,
    private dialog: MatDialog,
    private mainPageHeaderService: MainPageHeaderService,
    private store: Store,
  ) {}

  get roles$(): Observable<TableRow[]> {
    return this.rolesSubject$.asObservable();
  }

  setPageTitle() {
    this.mainPageHeaderService.setPageTitle('Роли');
  }

  fetchRoles(): Observable<BaseItemsResponse<User>> {
    return this.api.getAllUsers().pipe(
      tap((data: BaseItemsResponse<User>) => {
        this.users = data.items;
        this.rolesSubject$.next(this.createRows(data.items));
      }),
    );
  }

  manageEvent(data: TableAction<User>) {
    switch (data.action) {
      case RoleAction.Delete:
        this.deleteRole(data);
        break;
    }
  }

  assignRole() {
    this.openAssignRoleModal()
      .pipe(
        filter(Boolean),
        switchMap((res: AssignRoleModalResult) => this.api.assignRoleToUser(res.userId, res.roleId)),
        switchMap(() => this.fetchRoles()),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.notificationService.openSuccess(RoleNotification.Assigned);
      });
  }

  private openAssignRoleModal(): Observable<AssignRoleModalResult | false> {
    return this.dialog
      .open(AssignRoleModalComponent, {
        ...ADMIN_MODAL_CONFIG,
        data: {
          roles: this.roles,
          users: this.users,
        },
      })
      .afterClosed();
  }

  private deleteRole(data: TableAction<User>) {
    const user = data.row;

    this.openDeleteRoleModal(user)
      .pipe(
        filter(Boolean),
        switchMap(() => this.api.assignRoleToUser(user.id, this.userRoleId)),
        switchMap(() => this.fetchRoles()),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.notificationService.openSuccess(RoleNotification.Deleted);
      });
  }

  private openDeleteRoleModal(user: User): Observable<boolean> {
    return this.dialog
      .open(ConfirmationModalComponent, {
        ...ADMIN_MODAL_CONFIG,
        data: {
          title: RoleModal.DeleteTitle,
          contentComponentData: user,
          contentComponent: DeleteRoleModalContentComponent,
          applyButtonText: RoleModal.DeleteButtonText,
          cancelButtonText: UserModal.CancelButtonText,
        },
      })
      .afterClosed();
  }

  private createRows(users: User[]): TableRow[] {
    return users.reduce((acc: User[], user: User) => {
      if (user.role.id !== this.userRoleId) {
        const userWithRole = { ...user, roleName: user.role.name };
        acc.push(userWithRole);
      }
      return acc;
    }, []);
  }

  private get userRoleId(): number {
    return this.roles.find((role: Role) => role.slug === 'user').id;
  }
}
