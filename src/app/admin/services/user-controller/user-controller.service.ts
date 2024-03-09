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
import { RowAction } from '@app/shared/models';

@UntilDestroy
@Injectable()
export class UserControllerService {
  private usersSubject$ = new BehaviorSubject<TableRow<User>[]>([]);

  constructor(
    private api: AdminApi,
    private notificationService: NotificationsService,
    private dialog: MatDialog,
    private mainPageHeaderService: MainPageHeaderService,
  ) {}

  get users$(): Observable<TableRow<User>[]> {
    return this.usersSubject$.asObservable();
  }

  setPageTitle(title: string) {
    this.mainPageHeaderService.setPageTitle(title);
  }

  fetchUsers(): Observable<BaseItemsResponse<User>> {
    return this.api
      .getAllUsers()
      .pipe(tap((data: BaseItemsResponse<User>) => this.usersSubject$.next(this.createRows(data.items))));
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
    const user = data.row.entity;

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
    const user = data.row.entity;
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

  private createRows(users: User[]): TableRow<User>[] {
    return users.map((user) => {
      return {
        ...user,
        entity: user,
        email: user.email,
        name: user.name,
        surname: user.surname,
        phone_number: user.phone_number,
        statusName: this.getUserStatus(user),
        actions: this.getActions(user),
      };
    });
  }

  private getUserStatus(user: User): string {
    return user.is_readonly ? UserStatus.Blocked : UserStatus.Active;
  }

  private getActions(user: User): RowAction {
    return user.is_readonly
      ? {
          ...INITIAL_USERS_ACTIONS_STATE,
          [UserAction.Delete]: { tooltip: UsersActionsTooltips.Delete, disabled: false },
        }
      : { ...INITIAL_USERS_ACTIONS_STATE };
  }
}
