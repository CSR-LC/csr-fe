import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, switchMap, tap } from 'rxjs';
import { BaseItemsResponse } from '@shared/types';
import { AdminApi } from '@app/admin/services';
import { User } from '@app/auth/models';
import { TableAction } from '@shared/models/table-action';
import { UserAction } from '@shared/constants';
import { NotificationsService } from '@shared/services/notifications/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { ADMIN_MODAL_CONFIG } from '@app/admin/constants/admin-modal-config';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { UserNotification } from '@app/admin/constants/user-notification.enum';
import { TableRow } from '@shared/models/table-row';
import { UserStatus } from '@app/admin/constants/user-status.enum';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { ConfirmationModalComponent } from '@shared/components';
import { UserModal } from '@app/admin/constants/user-modal.enum';
import { BlockUserModalContentComponent, DeleteUserModalContentComponent } from '@app/admin/components';
import { INITIAL_USERS_ACTIONS_STATE } from '@app/admin/constants/initial-users-actions-state';
import { UsersActionsTooltips } from '@app/admin/constants/users-actions-tooltips.enum';

@UntilDestroy
@Injectable()
export class UserControllerService {
  private usersSubject$ = new BehaviorSubject<TableRow[]>([]);
  private _users: TableRow[] = [];

  constructor(
    private api: AdminApi,
    private notificationService: NotificationsService,
    private dialog: MatDialog,
    private mainPageHeaderService: MainPageHeaderService,
  ) {}

  get users$(): Observable<TableRow[]> {
    return this.usersSubject$.asObservable();
  }

  get users(): TableRow[] {
    return this._users;
  }

  set users(users: TableRow[]) {
    this._users = users;
  }

  setPageTitle(title: string) {
    this.mainPageHeaderService.setPageTitle(title);
  }

  setUsers(users: TableRow[]) {
    this.usersSubject$.next(users.length > 0 ? users : this.users);
  }

  fetchUsers(): Observable<BaseItemsResponse<User>> {
    return this.api.getAllUsers().pipe(
      tap((data: BaseItemsResponse<User>) => {
        const rows = this.createRows(data.items);
        this.usersSubject$.next(rows);
        this.users = rows;
      }),
    );
  }

  editUser(data: TableAction<User>) {
    switch (data.action) {
      case UserAction.Profile:
        break;
      case UserAction.Block:
        this.updateUserBlockingStatus(data);
        break;
      case UserAction.Delete:
        this.deleteUser(data);
        break;
    }
  }

  private updateUserBlockingStatus(data: TableAction<User>) {
    const user = data.row;

    this.openBlockUserModal(user)
      .pipe(
        filter(Boolean),
        switchMap(() => this.api.updateUserReadonlyAccess(user.id, !user.is_readonly)),
        switchMap(() => this.fetchUsers()),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.notificationService.openSuccess(user.is_readonly ? UserNotification.Unblocked : UserNotification.Blocked);
      });
  }

  private openBlockUserModal(user: User): Observable<boolean> {
    return this.dialog
      .open(ConfirmationModalComponent, {
        ...ADMIN_MODAL_CONFIG,
        data: {
          title: user.is_readonly ? UserModal.UnblockTitle : UserModal.BlockTitle,
          contentComponentData: user,
          contentComponent: BlockUserModalContentComponent,
          applyButtonText: user.is_readonly ? UserModal.UnblockButtonText : UserModal.BlockButtonText,
          cancelButtonText: UserModal.CancelButtonText,
        },
      })
      .afterClosed();
  }

  private deleteUser(data: TableAction<User>) {
    const user = data.row;
    this.openDeleteUserModal(user)
      .pipe(
        filter(Boolean),
        switchMap(() => this.api.deleteUser(user.id)),
        switchMap(() => this.fetchUsers()),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.notificationService.openSuccess(UserNotification.Deleted);
      });
  }

  private openDeleteUserModal(user: User): Observable<boolean> {
    return this.dialog
      .open(ConfirmationModalComponent, {
        ...ADMIN_MODAL_CONFIG,
        data: {
          title: UserModal.DeleteTitle,
          contentComponentData: user,
          contentComponent: DeleteUserModalContentComponent,
          applyButtonText: UserModal.DeleteButtonText,
          cancelButtonText: UserModal.CancelButtonText,
        },
      })
      .afterClosed();
  }

  public createRows(users: User[]): TableRow[] {
    return users.map((user) => {
      let actions = INITIAL_USERS_ACTIONS_STATE;
      if (user.is_readonly) {
        user.status = UserStatus.Blocked;
        actions = {
          ...actions,
          [UserAction.Delete]: { tooltip: UsersActionsTooltips.Delete, disabled: false },
        };
      } else {
        user.status = UserStatus.Active;
      }

      return { ...user, actions, selected: false };
    });
  }
}
