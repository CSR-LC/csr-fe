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
import { BlockUserModalContentComponent } from '@app/admin/components/block-user-modal-content/block-user-modal-content.component';
import { UnblockUserModalContentComponent } from '@app/admin/components/unblock-user-modal-content/unblock-user-modal-content.component';

@UntilDestroy
@Injectable()
export class UserControllerService {
  private usersSubject$ = new BehaviorSubject<TableRow[]>([]);

  constructor(
    private api: AdminApi,
    private notificationService: NotificationsService,
    private dialog: MatDialog,
    private mainPageHeaderService: MainPageHeaderService,
  ) {}

  get users$(): Observable<TableRow[]> {
    return this.usersSubject$.asObservable();
  }

  setPageTitle(title: string) {
    this.mainPageHeaderService.setPageTitle(title);
  }

  fetchUsers() {
    return this.api
      .getAllUsers()
      .pipe(tap((data: BaseItemsResponse<User>) => this.usersSubject$.next(this.createRows(data.items))));
  }

  editUser(data: TableAction<User>) {
    const user = data.row;

    switch (data.action) {
      case UserAction.Profile:
        break;
      case UserAction.Block:
        user.is_readonly ? this.unblockUser(data) : this.blockUser(data);
        break;
      case UserAction.Delete:
        break;
    }
  }

  private blockUser(data: TableAction<User>) {
    const user = data.row;

    this.openBlockUserModal(user)
      .pipe(
        filter(Boolean),
        switchMap(() => this.api.updateUserReadonlyAccess(user.id, true)),
        switchMap(() => this.fetchUsers()),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.notificationService.openSuccess(UserNotification.Blocked);
      });
  }

  private unblockUser(data: TableAction<User>) {
    const user = data.row;

    this.openUnblockUserModal(user)
      .pipe(
        filter(Boolean),
        switchMap(() => this.api.updateUserReadonlyAccess(user.id, false)),
        switchMap(() => this.fetchUsers()),
        untilDestroyed(this),
      )
      .subscribe(() => {
        this.notificationService.openSuccess(UserNotification.Unblocked);
      });
  }

  private openBlockUserModal(user: User): Observable<boolean> {
    return this.dialog
      .open(ConfirmationModalComponent, {
        ...ADMIN_MODAL_CONFIG,
        data: {
          title: UserModal.BlockTitle,
          contentComponentData: user,
          contentComponent: BlockUserModalContentComponent,
          applyButtonText: UserModal.BlockButtonText,
          cancelButtonText: UserModal.CancelButtonText,
        },
      })
      .afterClosed();
  }

  private openUnblockUserModal(user: User): Observable<boolean> {
    return this.dialog
      .open(ConfirmationModalComponent, {
        ...ADMIN_MODAL_CONFIG,
        data: {
          title: UserModal.UnblockTitle,
          contentComponentData: user,
          contentComponent: UnblockUserModalContentComponent,
          applyButtonText: UserModal.UnblockButtonText,
          cancelButtonText: UserModal.CancelButtonText,
        },
      })
      .afterClosed();
  }

  private createRows(users: User[]): TableRow[] {
    return users.map((user) => {
      !user.is_readonly ? (user.status = UserStatus.Active) : (user.status = UserStatus.Blocked);
      return user;
    });
  }
}
