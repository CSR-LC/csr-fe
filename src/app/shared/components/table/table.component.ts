import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableAction } from '@shared/models/table-action';
import { TableColumn } from '@shared/models/table-column';
import { TableRow } from '@app/shared/models/table-row';
import { FilteredData } from '@shared/models/filter-data';
import { TableFilterOption } from '@shared/models/table-filter-option';

@Component({
  selector: 'lc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow[] = [];
  @Input() limit = 10;

  @Output() action = new EventEmitter<TableAction<T>>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  total = 0;
  dataSource!: MatTableDataSource<TableRow>;
  activeFilters: Map<keyof TableRow, Set<string>> = new Map();
  isAllFiltersReset = false;
  filterOptions: Map<keyof TableRow, TableFilterOption[]> = new Map();

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['data']) {
      if (this.data && this.data.length > 0) {
        this.setFilterOptions();
      }
      this.total = this.data.length;
      this.dataSource = this.getMatTableData(this.data);
    }
  }

  get displayedColumns() {
    return this.columns.map((column: TableColumn) => column.columnDef);
  }

  editRow(data: TableAction<T>) {
    this.action.emit(data);
  }

  private getMatTableData(data: TableRow[]): MatTableDataSource<TableRow> {
    const matData = new MatTableDataSource(data);

    if (this.sort && this.dataSource) {
      matData.sort = this.sort;
    }

    if (this.paginator) {
      matData.paginator = this.paginator;
    }
    return matData;
  }

  filterTableData(filteredData: FilteredData) {
    this.updateActiveFilters(filteredData);
    this.applyActiveFilters();
  }

  resetFilters() {
    this.activeFilters.clear();
    this.dataSource = this.getMatTableData(this.data);
    this.isAllFiltersReset = true;
  }

  private updateActiveFilters(filteredData: FilteredData) {
    const selectedSet = new Set(filteredData.rows.map((row) => row[filteredData.columnDef]));
    if (selectedSet.size > 0) {
      this.activeFilters.set(filteredData.columnDef, selectedSet);
    } else {
      this.activeFilters.delete(filteredData.columnDef);
    }
  }

  private applyActiveFilters() {
    const filteredData = this.data.filter((row) => this.rowPassesFilters(row));
    this.dataSource = this.getMatTableData(filteredData);
  }

  private rowPassesFilters(row: TableRow) {
    for (const [columnDef, selectedValues] of this.activeFilters) {
      if (!selectedValues.has(row[columnDef])) {
        return false;
      }
    }
    return true;
  }

  private getUniqueValues(
    data: TableRow[],
    columnDef: keyof TableRow,
    emptyValue: string,
  ): Map<string, TableFilterOption> {
    const map = new Map();

    for (const row of data) {
      let value = row[columnDef];

      if (!value) {
        value = row[columnDef] = emptyValue;
      }

      if (!map.has(value)) {
        map.set(value, { row, selected: false });
      }
    }

    return map;
  }

  private createFilterOptions(data: TableRow[], columnDef: keyof TableRow, emptyValue: string): TableFilterOption[] {
    const uniqueValues = this.getUniqueValues(data, columnDef, emptyValue);
    return Array.from(uniqueValues.values());
  }

  private setFilterOptions() {
    this.columns.forEach((column) => {
      if (!column.action)
        this.filterOptions.set(column.columnDef, this.createFilterOptions(this.data, column.columnDef, 'Пусто'));
    });
  }
}
