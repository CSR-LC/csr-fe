import { Injectable, inject } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { BehaviorSubject, EMPTY, filter, Observable, switchMap, tap } from 'rxjs';
import { TableRow } from '@shared/models/table-row';
import { AdminApi } from '@app/admin/services';
import { NotificationsService } from '@shared/services/notifications/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { BaseItemsResponse } from '@shared/types';
import { User } from '@app/auth/models';
import { TableAction } from '@shared/models/table-action';
import { UserModal } from '@app/admin/constants';
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
  private api = inject(AdminApi);
  private notificationService = inject(NotificationsService);
  private dialog = inject(MatDialog);
  private mainPageHeaderService = inject(MainPageHeaderService);
  private store = inject(Store);

  private rolesSubject$ = new BehaviorSubject<TableRow<User>[]>([]);
  private roles = this.store.selectSnapshot(ApplicationDataState.roles);
  private users: User[] = [];
  private userRoleIdSaved?: number;

  get roles$(): Observable<TableRow<User>[]> {
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
        data: {
          roles: this.roles,
          users: this.users,
        },
      })
      .afterClosed();
  }

  private deleteRole(data: TableAction<User>) {
    const user = data.row.entity;

    this.openDeleteRoleModal(user)
      .pipe(
        filter(Boolean),
        switchMap(() => (this.userRoleId ? this.api.assignRoleToUser(user.id, this.userRoleId) : EMPTY)),
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

  private createRows(users: User[]): TableRow<User>[] {
    return users.reduce((acc: TableRow<User>[], user: User) => {
      if (user.role.id !== this.userRoleId) {
        acc.push(this.createTableRow(user));
      }
      return acc;
    }, []);
  }

  private createTableRow(user: User): TableRow<User> {
    return {
      entity: user,
      email: user.email,
      surname: user.surname,
      name: user.name,
      roleName: user.role.name,
    };
  }

  private get userRoleId(): number | undefined {
    if (this.userRoleIdSaved !== undefined) return this.userRoleIdSaved;
    this.userRoleIdSaved = (this.roles && this.roles.find((role: Role) => role.slug === 'user')?.id) || undefined;
    return this.userRoleIdSaved;
  }
}
