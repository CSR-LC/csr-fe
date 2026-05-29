import { Injectable, inject } from '@angular/core';
import { ApiService } from '../api/api.service';
import { map, Observable, switchMap } from 'rxjs';
import { equipmentStatuses } from '@app/admin/constants/equipment-statuses';
import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { Category } from '@app/catalog/models';
import { Store } from '@ngxs/store';
import {
  ApplicationDataState,
  EquipmentCategoriesAction,
  EquipmentStatusesAction,
} from '@app/shared/store/application-data';

@Injectable()
export class EquipmentResolverService {
  private readonly api = inject(ApiService);
  private readonly store = inject(Store);

  getEquipmentStatuses(): Observable<EquipmentStatus[]> {
    return this.api.getEquipmentStatuses().pipe(
      map((res) => this.fillInStatusesTranslations(res)),
      switchMap((statuses) => this.store.dispatch(new EquipmentStatusesAction(statuses))),
      map(() => this.store.selectSnapshot(ApplicationDataState.equipmentStatuses) || []),
    );
  }

  fillInStatusesTranslations(statuses: EquipmentStatus[]): EquipmentStatus[] {
    return statuses.map((status) => {
      const translation = equipmentStatuses[status.name];
      if (translation) status.translation = translation;
      return status;
    });
  }

  getEquipmentCategories(): Observable<Category[]> {
    return this.api.getEquipmentCategories().pipe(
      switchMap((res) => this.store.dispatch(new EquipmentCategoriesAction(res.items))),
      map(() => this.store.selectSnapshot(ApplicationDataState.equipmentCategories) || []),
    );
  }
}
