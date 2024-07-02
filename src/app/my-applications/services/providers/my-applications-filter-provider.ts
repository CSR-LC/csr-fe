import { DropdownFilterProvider } from '@shared/models/dropdown-filter-provider';
import { Observable, of } from 'rxjs';
import { DropdownFilter } from '@shared/models/dropdown-filter';
import { DropdownFilterOption } from '@shared/models/dropdown-filter-option';
import { Injectable } from '@angular/core';
import { aggregatedStatuses } from '@app/my-applications/constants/aggregated-statuses';

@Injectable()
export class MyApplicationsFilterProvider implements DropdownFilterProvider {
  getFilter(): Observable<DropdownFilter> {
    return of(this.createFilter(this.createOptions()));
  }

  getId(): string {
    return 'my-applications-filter';
  }

  private createOptions(): DropdownFilterOption[] {
    return aggregatedStatuses.map((status) => ({ label: status.translation || status.name, value: status.name }));
  }

  private createFilter(options: DropdownFilterOption[]): DropdownFilter {
    return {
      id: this.getId(),
      label: 'Показать',
      options,
    };
  }
}
