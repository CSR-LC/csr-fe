import { Injectable } from '@angular/core';
import { ApiService } from '@app/my-applications/services/api/api.service';
import { map, Observable } from 'rxjs';
import { MyApplicationsFilterProvider } from '@app/my-applications/services/providers/my-applications-filter-provider';
import { DropdownFilter } from '@shared/models/dropdown-filter';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';

@Injectable()
export class ControllerService {
  constructor(
    private readonly api: ApiService,
    private readonly filterProvider: MyApplicationsFilterProvider,
    private readonly headerService: MainPageHeaderService,
  ) {}

  getApplications(status = 'all', limit = 10, offset = 0) {
    return this.api.getOrders(status, limit, offset).pipe(map((response) => response.items));
  }

  getFilter(): Observable<DropdownFilter> {
    return this.filterProvider.getFilter();
  }

  setPageTitle() {
    this.headerService.setPageTitle('Мои заявки');
  }
}
