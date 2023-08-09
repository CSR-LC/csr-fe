import { Injectable } from '@angular/core';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { FilterModalComponent } from '@app/catalog/components/filter-modal/filter-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { EquipmentFilter, EquipmentFilterRequest } from '@app/catalog/models';
import { Select, Store } from '@ngxs/store';
import { CatalogState, SetEquipmentFilter, SetSearchInput, SetSelectedCategoryId } from '@app/catalog/store';
import { ApplicationDataState } from '@shared/store/application-data';

@Injectable({
  providedIn: 'root',
})
export class CatalogFilterService {
  @Select(CatalogState.equipmentFilterCount) equipmentFilterCount$!: Observable<number>;
  private filtersButtonDisplayed = new Subject<boolean>();

  constructor(private readonly dialog: MatDialog, private readonly store: Store) {}

  getFiltersButtonDisplayed(): Observable<boolean> {
    return this.filtersButtonDisplayed.asObservable();
  }

  setFiltersButtonDisplayed(value: boolean): void {
    this.filtersButtonDisplayed.next(value);
  }

  openFiltersModal(): Observable<EquipmentFilter> {
    const equipmentFilterForm = this.store.selectSnapshot(CatalogState.equipmentFilterForm);
    const petKinds = this.store.selectSnapshot(ApplicationDataState.petKinds);
    const petSizes = this.store.selectSnapshot(ApplicationDataState.petSizes);

    return this.dialog
      .open(FilterModalComponent, {
        minWidth: 350,
        data: {
          equipmentFilterForm,
          petKinds,
          petSizes,
        },
      })
      .afterClosed()
      .pipe(switchMap((equipmentFilter: EquipmentFilter) => of(equipmentFilter)));
  }

  get equipmentFilterRequest(): EquipmentFilterRequest {
    return { name_substring: this.searchInput, category: this.selectedCategoryId, ...this.equipmentFilter };
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

  get selectedCategoryId(): number {
    return this.store.selectSnapshot(CatalogState.selectedCategoryId);
  }

  get equipmentFilter(): EquipmentFilter {
    return this.store.selectSnapshot(CatalogState.equipmentFilter);
  }

  get searchInput(): string {
    return this.store.selectSnapshot(CatalogState.searchInput);
  }
}
