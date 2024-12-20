import { Injectable, inject } from '@angular/core';
import { AdminApi } from '..';
import { map, Observable, switchMap } from 'rxjs';
import { ApplicationStatusNamesTranslation } from '@app/admin/constants/applications-status-names-translation';
import { Item, ItemTranslated } from '@app/shared/types';
import { Store } from '@ngxs/store';
import { ApplicationDataState, ApplicationStatusesAction } from '@app/shared/store/application-data';

@Injectable({
  providedIn: 'root',
})
export class OrdersResolverService {
  private readonly api = inject(AdminApi);
  private readonly store = inject(Store);

  getApplicationStatusNames(): Observable<ItemTranslated[]> {
    return this.api.getApplicationStatuses().pipe(
      map((statuses) => this.translateStatuses(statuses)),
      switchMap((statuses) => this.store.dispatch(new ApplicationStatusesAction(statuses))),
      map(() => this.store.selectSnapshot(ApplicationDataState.applicationStatuses) || []),
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
