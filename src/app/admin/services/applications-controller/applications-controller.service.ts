import { Injectable } from '@angular/core';
import { AdminApi } from '..';
import { tap, map } from 'rxjs/operators';
import { Application } from '@app/admin/types/application';
import { TableRow } from '@app/shared/models/table-row';
import { User } from '@app/auth/models';
import { Equipment } from '@app/catalog/models/equipment';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { ApplicationStatus } from '@app/admin/types/application-status';
import { ApplicationStatusNamesTranslation } from '@app/admin/constants/applications-status-names-translation';
import { ApplicationUsersInfo } from '@app/admin/types/application-user-info';
import { ApplicationEquipmentInfo } from '@app/admin/constants/application-equipment-info';

@Injectable()
export class ApplicationsControllerService {
  private readonly applicationsSub = new BehaviorSubject<TableRow[]>([]);

  get applicationsData$(): Observable<TableRow[]> {
    return this.applicationsSub.asObservable();
  }

  constructor(private readonly api: AdminApi) {}

  fetchEquipments() {
    return this.api.getAllOrders().pipe(
      map((res) => this.createRows(res.items)),
      tap((res) => this.applicationsSub.next(res)),
    );
  }

  createRows(applications: Application[]): TableRow[] {
    return applications.map((application) => {
      return {
        ...application,
        ...this.getUserInfo(application.user),
        ...this.getEquipmentInfo(application.equipments),
        rentPeriod: this.getRentPeriodValue(application),
        status: this.getApplicationStatusName(application.last_status),
      };
    });
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
}
