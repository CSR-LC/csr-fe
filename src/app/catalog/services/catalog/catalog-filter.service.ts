import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { FilterModalComponent } from '@app/catalog/components/filter-modal/filter-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class CatalogFilterService {
  private filtersButtonDisplayed = new Subject<boolean>();
  private filtersButtonToggled = new Subject<boolean>();

  constructor(private readonly dialog: MatDialog) {}

  getFiltersButtonDisplayed(): Observable<boolean> {
    return this.filtersButtonDisplayed.asObservable();
  }

  setFiltersButtonDisplayed(value: boolean): void {
    this.filtersButtonDisplayed.next(value);
  }

  getFiltersButtonToggled(): Observable<boolean> {
    return this.filtersButtonToggled.asObservable();
  }

  setFiltersButtonToggled(value: boolean): void {
    this.filtersButtonToggled.next(value);
  }

  openFiltersModal(): void {
    this.dialog.open(FilterModalComponent, { minWidth: 350 }).afterClosed().pipe(filter(Boolean)).subscribe();
  }
}
