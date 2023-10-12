import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, map, tap, switchMap } from 'rxjs';
import { equipmentStatuses } from '@app/admin/constants/equipment-statuses';
import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { BaseItemsResponse } from '@app/shared/types';
import { Category } from '@app/catalog/models';
import { Store } from '@ngxs/store';
import { EquipmentCategoriesAction, EquipmentStatusesAction } from '@app/shared/store/application-data';

@Injectable()
export class EquipmentResolverService {
  constructor(private readonly api: ApiService, private readonly store: Store) {}

  getEquipmentStatuses(): Observable<EquipmentStatus[]> {
    return this.api.getEquipmentStatuses().pipe(
      map((res) => this.fillInStatusesTranslations(res)),
      switchMap((statuses) => this.store.dispatch(new EquipmentStatusesAction(statuses))),
      map((store) => store.application_data?.equipmentStatuses),
    );
  }

  fillInStatusesTranslations(statuses: EquipmentStatus[]): EquipmentStatus[] {
    return statuses.map((status) => {
      const translation = equipmentStatuses[status.name];
      if (translation) status.translation = translation;
      return status;
    });
  }

  getEquipmentCategories(): Observable<BaseItemsResponse<Category>> {
    return this.api.getEquipmentCategories().pipe(
      switchMap((res) => this.store.dispatch(new EquipmentCategoriesAction(res.items))),
      map((store) => store.application_data?.equipmentCategories),
    );
  }
}
