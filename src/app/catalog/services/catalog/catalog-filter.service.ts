import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { FilterModalComponent } from '@app/catalog/components/filter-modal/filter-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class CatalogFilterService {
  private filtersButtonDisplayed = new Subject<boolean>();

  constructor(private readonly dialog: MatDialog) {}

  getFiltersButtonDisplayed(): Observable<boolean> {
    return this.filtersButtonDisplayed.asObservable();
  }

  setFiltersButtonDisplayed(value: boolean): void {
    this.filtersButtonDisplayed.next(value);
  }

  openFiltersModal(): Observable<boolean> {
    return this.dialog.open(FilterModalComponent, { minWidth: 350 }).afterClosed().pipe(filter(Boolean));
  }
}
