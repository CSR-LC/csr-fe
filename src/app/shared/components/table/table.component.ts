import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  inject,
  AfterViewInit,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableAction } from '@shared/models/table-action';
import { TableColumn } from '@shared/models/table-column';
import { TableRow } from '@app/shared/models/table-row';
import { SelectedFilters } from '@shared/models/selected-filters';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';

@UntilDestroy
@Component({
  selector: 'lc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements AfterViewInit, OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow<T>[] = [];
  @Input() limit = 10;

  @Output() action = new EventEmitter<TableAction<T>>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  private readonly document = inject(DOCUMENT);

  total = 0;
  dataSource!: MatTableDataSource<TableRow<T>>;
  activeFilters: Map<keyof TableRow, Set<string>> = new Map();
  isAllFiltersReset = false;

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['data']) {
      this.total = this.data.length;
      this.dataSource = this.getMatTableData(this.data);
    }
  }

  ngAfterViewInit() {
    // prevent clicks by mat-options in mat-autocomplete in filter
    // remove after stop using mat-autocomplete in filters
    this.preventAutocompleteClick();
  }

  private preventAutocompleteClick() {
    if (!this.document) return;
    fromEvent(this.document, 'click', { capture: true })
      .pipe(untilDestroyed(this))
      .subscribe((event) => {
        if ((event.target as HTMLElement).classList.contains('mat-mdc-option')) {
          event.stopPropagation();
        }
      });
  }

  get displayedColumns() {
    return this.columns.map((column: TableColumn) => column.columnDef);
  }

  editRow(data: TableAction<T>) {
    this.action.emit(data);
  }

  private getMatTableData(data: TableRow<T>[]): MatTableDataSource<TableRow<T>> {
    const matData = new MatTableDataSource(data);

    if (this.sort && this.dataSource) {
      matData.sort = this.sort;
    }

    if (this.paginator) {
      matData.paginator = this.paginator;
    }
    return matData;
  }

  filterTableData(selectedFilters: SelectedFilters) {
    this.updateActiveFilters(selectedFilters);
    this.applyActiveFilters();
  }

  resetFilters() {
    this.activeFilters.clear();
    this.dataSource = this.getMatTableData(this.data);
    this.isAllFiltersReset = true;
  }

  private updateActiveFilters(selectedFilters: SelectedFilters) {
    if (selectedFilters.selectedValues.size > 0) {
      this.activeFilters.set(selectedFilters.columnDef, selectedFilters.selectedValues);
    } else {
      this.activeFilters.delete(selectedFilters.columnDef);
    }
  }

  private applyActiveFilters() {
    const filteredData = this.data.filter((row) => this.rowPassesFilters(row));
    this.dataSource = this.getMatTableData(filteredData);
  }

  private rowPassesFilters(row: TableRow<T>) {
    for (const [columnDef, selectedValues] of this.activeFilters) {
      if (!selectedValues.has(row[columnDef])) {
        return false;
      }
    }
    return true;
  }
}
