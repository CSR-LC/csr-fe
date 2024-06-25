import { DropdownFilterProvider } from '@shared/models/dropdown-filter-provider';
import { map, Observable, shareReplay } from 'rxjs';
import { DropdownFilter } from '@shared/models/dropdown-filter';
import { DropdownFilterOption } from '@shared/models/dropdown-filter-option';
import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { ApplicationDataState } from '@shared/store/application-data';
import { ItemTranslated } from '@shared/types';

@Injectable()
export class MyApplicationsFilterProvider implements DropdownFilterProvider {
  @Select(ApplicationDataState.applicationStatuses) applicationStatuses$!: Observable<ItemTranslated[]>;
  filterOptions$ = this.applicationStatuses$.pipe(
    map((statuses) => this.createOptions(statuses)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  getFilter(): Observable<DropdownFilter> {
    return this.filterOptions$.pipe(map((options) => this.createFilter(options)));
  }

  getId(): string {
    return 'my-applications-filter';
  }

  private createOptions(statuses: ItemTranslated[]): DropdownFilterOption[] {
    const aggregatedStatuses = ['all', 'active', 'finished'];
    return statuses.map((status) => ({ label: status.translation || status.name, value: status.name }));
  }

  private createFilter(options: DropdownFilterOption[]): DropdownFilter {
    return {
      id: this.getId(),
      label: 'Показать',
      options,
    };
  }
}
