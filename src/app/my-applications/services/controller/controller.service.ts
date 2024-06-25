import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { ApiService } from '@app/my-applications/services/api/api.service';
import { map, Observable } from 'rxjs';
import { MyApplicationsFilterProvider } from '@app/my-applications/services/providers/my-applications-filter-provider';
import { DropdownFilter } from '@shared/models/dropdown-filter';

@Injectable()
export class ControllerService {
  constructor(
    private readonly api: ApiService,
    private readonly store: Store,
    private readonly filterProvider: MyApplicationsFilterProvider,
  ) {}

  getApplications(status = 'all', limit = 10, offset = 0) {
    return this.api.getOrders(status, limit, offset).pipe(map((response) => response.items));
  }

  getFilter(): Observable<DropdownFilter> {
    return this.filterProvider.getFilter();
  }
}
