import { Injectable } from '@angular/core';
import { AdminApi } from '..';
import { map, Observable, switchMap } from 'rxjs';
import { ApplicationStatusNamesTranslation } from '@app/admin/constants/applications-status-names-translation';
import { Item, ItemTranslated } from '@app/shared/types';
import { Store } from '@ngxs/store';
import { ApplicationStatusesAction } from '@app/shared/store/application-data';

@Injectable({
  providedIn: 'root',
})
export class OrdersResolverService {
  constructor(private readonly api: AdminApi, private readonly store: Store) {}

  getApplicationStatusNames(): Observable<ItemTranslated[]> {
    return this.api.getApplicationStatuses().pipe(
      map((statuses) => this.translateStatuses(statuses)),
      switchMap((statuses) => this.store.dispatch(new ApplicationStatusesAction(statuses))),
      map((store) => store.application_data?.applicationStatuses),
    );
  }

  private translateStatuses(statuses: Item[]): ItemTranslated[] {
    return statuses.map((status) => {
      return {
        ...status,
        translation:
          ApplicationStatusNamesTranslation[status.name as keyof typeof ApplicationStatusNamesTranslation] || '',
      };
    });
  }
}
