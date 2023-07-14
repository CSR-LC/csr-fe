import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { FilterModalComponent } from '@app/catalog/components/filter-modal/filter-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentFilter } from '@app/catalog/models';
import { ResetForm } from '@ngxs/form-plugin';
import { Store } from '@ngxs/store';
import { SetEquipmentFilter, SetSearchInput, SetSelectedCategoryId } from '@app/catalog/store';

@Injectable({
  providedIn: 'root',
})
export class CatalogFilterService {
  private filtersButtonDisplayed = new Subject<boolean>();

  constructor(private readonly dialog: MatDialog, private readonly store: Store) {}

  getFiltersButtonDisplayed(): Observable<boolean> {
    return this.filtersButtonDisplayed.asObservable();
  }

  setFiltersButtonDisplayed(value: boolean): void {
    this.filtersButtonDisplayed.next(value);
  }

  openFiltersModal(): Observable<boolean> {
    return this.dialog.open(FilterModalComponent, { minWidth: 350 }).afterClosed().pipe(filter(Boolean));
  }

  resetFilters(): void {
    this.store.dispatch(new ResetForm({ path: 'catalog.equipmentFilterForm' }));
  }

  set selectedCategoryId(categoryId: number) {
    this.store.dispatch(new SetSelectedCategoryId(categoryId));
  }

  set equipmentFilter(equipmentFilter: EquipmentFilter) {
    this.store.dispatch(new SetEquipmentFilter(equipmentFilter));
  }

  set searchInput(searchInput: string) {
    this.store.dispatch(new SetSearchInput(searchInput));
  }
}
