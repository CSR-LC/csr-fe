import { Injectable } from '@angular/core';
import { AdminApi } from '..';
import { tap, map, switchMap } from 'rxjs/operators';
import { Application } from '@app/admin/types/application';
import { TableRow } from '@app/shared/models/table-row';
import { User } from '@app/auth/models';
import { Equipment } from '@app/catalog/models/equipment';
import { BehaviorSubject, filter, Observable, of } from 'rxjs';
import { ApplicationStatus } from '@app/admin/types/application-status';
import { ApplicationStatusNamesTranslation } from '@app/admin/constants/applications-status-names-translation';
import { ApplicationUsersInfo } from '@app/admin/types/application-user-info';
import { ApplicationEquipmentInfo } from '@app/admin/constants/application-equipment-info';
import { TableAction } from '@app/shared/models/table-action';
import { ApplicationAction } from '@app/admin/constants/application-action';
import { MatDialog } from '@angular/material/dialog';
import { EditApplicationStatusComponent } from '@app/admin/components';
import { ADMIN_MODAL_CONFIG } from '@app/admin/constants/admin-modal-config';
import { Store } from '@ngxs/store';
import { ItemTranslated } from '@app/shared/types';
import { NotificationsService } from '@app/shared/services/notifications/notifications.service';
import { ChangeStatusBody } from '@app/admin/types';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';
import { InfoModalComponent } from '@app/shared/components';
import { ApplicationStatusName } from '@app/admin/constants/applications-status-names';
import { RowAction } from '@app/shared/models';

@Injectable()
export class ApplicationsControllerService {
  private readonly applicationsSub = new BehaviorSubject<TableRow[]>([]);

  get applicationsData$(): Observable<TableRow[]> {
    return this.applicationsSub.asObservable();
  }

  constructor(
    private readonly api: AdminApi,
    private readonly dialog: MatDialog,
    private readonly store: Store,
    private readonly notificationsService: NotificationsService,
    private readonly mainPageHeaderService: MainPageHeaderService,
  ) {}

  get applicationStatuses(): ItemTranslated[] {
    return this.store.snapshot().application_data?.applicationStatuses || [];
  }

  setPageTitle() {
    this.mainPageHeaderService.setPageTitle('Заявки');
  }

  fetchApplications(): Observable<TableRow[]> {
    return this.api.getAllOrders().pipe(
      map((res) => this.createRows(res.items)),
      tap((res) => this.applicationsSub.next(res)),
    );
  }

  createRows(applications: Application[]): TableRow[] {
    return applications.map((application) => {
      return {
        entity: application,
        ...application,
        ...this.getUserInfo(application.user),
        ...this.getEquipmentInfo(application.equipments),
        rentPeriod: this.getRentPeriodValue(application),
        status: this.getApplicationStatusName(application.last_status),
        actions: this.getRowActions(application),
      };
    });
  }

  private getRowActions(application: Application): RowAction {
    const status = application.last_status.status;
    return {
      [ApplicationAction.more]: {
        tooltip: '',
        disabled: false,
      },
      [ApplicationAction.edit]: {
        tooltip: '',
        disabled: status === ApplicationStatusName.closed || status === ApplicationStatusName.rejected,
      },
    };
  }

  private getApplicationStatusName(status: ApplicationStatus): string {
    const statusName = ApplicationStatusNamesTranslation[status.status];
    return statusName || '';
  }

  private getRentPeriodValue(application: Application): string {
    const start = new Date(application.rent_start);
    const end = new Date(application.rent_end);
    return `${start.getDate()}.${start.getMonth() + 1}-${end.getDate()}.${end.getMonth() + 1}`;
  }

  private getUserInfo(user: User): ApplicationUsersInfo {
    return {
      userName: user.name || '',
      userSurname: user.surname || '',
      userPhoneNumber: user.phone_number || '',
    };
  }

  private getEquipmentInfo(equipments: Equipment[]): ApplicationEquipmentInfo {
    const equipment = equipments[0] || undefined;
    return {
      equipmentName: equipment?.name || '',
      equipmentTitle: equipment?.title || '',
      equipmentInventoryNumber: equipment?.inventoryNumber || '',
    };
  }

  editApplication(event: TableAction<Application>) {
    const application = event.row;
    const action = event.action;
    if (action === ApplicationAction.edit) {
      this.editApplicationStatus(application);
    }
  }

  private editApplicationStatus(application: Application) {
    let newStatus: string;
    this.openEditApplicationStatusModal(application)
      .pipe(
        filter(Boolean),
        switchMap((newStatusName) => {
          newStatus = newStatusName;
          return this.checkNonChangeableStatuses(newStatusName);
        }),
        filter(Boolean),
        switchMap(() => {
          const body = this.getChangeStatusBody(application, newStatus);
          return this.api.editApplicationStatus(body);
        }),
        switchMap(() => this.fetchApplications()),
      )
      .subscribe(() => this.notificationsService.openSuccess('Статус заявки изменен'));
  }

  private checkNonChangeableStatuses(statusName: string): Observable<boolean> {
    switch (statusName) {
      case ApplicationStatusName.rejected:
        return this.openNotificationRejectedStatus();
      case ApplicationStatusName.closed:
        return this.openNotificationAboutClosedStatus();
      default:
        return of(true);
    }
  }

  private openNotificationAboutClosedStatus(): Observable<boolean> {
    return this.dialog
      .open(InfoModalComponent, {
        width: '472px',
        data: {
          headerText: 'Статус "Закрыто"',
          infoMessage:
            'Если Вы сохраните заявку в статусе "Закрыто", то изменить статус этой заявки в будущем будет невозможно.',
          buttonOkText: 'Сохранить',
          buttonCancelText: 'Отменить',
        },
      })
      .afterClosed();
  }

  private openNotificationRejectedStatus(): Observable<boolean> {
    return this.dialog
      .open(InfoModalComponent, {
        width: '472px',
        data: {
          headerText: 'Статус "Отклонено"',
          infoMessage:
            'Если Вы сохраните заявку в статусе "Отклонено", то изменить статус этой заявки в будущем будет невозможно.',
          buttonOkText: 'Сохранить',
          buttonCancelText: 'Отменить',
        },
      })
      .afterClosed();
  }

  private getChangeStatusBody(application: Application, newStatusName: string): ChangeStatusBody {
    return {
      comment: 'comment',
      created_at: new Date(),
      order_id: application.id,
      status: newStatusName,
    };
  }

  private openEditApplicationStatusModal(application: Application): Observable<string> {
    return this.dialog
      .open(EditApplicationStatusComponent, {
        ...ADMIN_MODAL_CONFIG,
        data: {
          application,
          statuses: this.applicationStatuses,
          statusTranslation: this.getApplicationStatusName(application.last_status),
          rentPeriod: this.getRentPeriodValue(application),
        },
      })
      .afterClosed();
  }
}
