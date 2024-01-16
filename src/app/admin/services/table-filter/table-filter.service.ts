import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableRow } from '@shared/models/table-row';

@Injectable()
export class TableFilterService {
  private _filteredOptionsSubject = new BehaviorSubject<TableRow[]>([]);
  private _appliedFilters = new Map<string, TableRow[]>();
  private _initialOptions: TableRow[] = [];
  private _initialOptionsSubject = new BehaviorSubject<TableRow[]>([]);
  filteredOptions$ = this._filteredOptionsSubject.asObservable();
  initialOptions$ = this._initialOptionsSubject.asObservable();

  setFilteredOptions(column: string, data: TableRow[]) {
    this._appliedFilters.set(column, data);
    this._filteredOptionsSubject.next(this.applyAllFilters());
  }

  setInitialOptions(data: TableRow[]) {
    this._initialOptions = data;
    this._initialOptionsSubject.next(data);
  }

  deleteOptions(column: string) {
    this._appliedFilters.delete(column);
    this._filteredOptionsSubject.next(this.applyAllFilters());
  }

  get numberOfAppliedFilters() {
    return this._appliedFilters.size;
  }

  private applyAllFilters(): TableRow[] {
    let options = this._initialOptions;

    for (const [column, filteredOptions] of this._appliedFilters) {
      if (filteredOptions.length) {
        options = options.filter((row) => {
          return filteredOptions.some((option) => option[column] === row[column] && option['id'] === row['id']);
        });
      }
    }

    return options;
  }
}
