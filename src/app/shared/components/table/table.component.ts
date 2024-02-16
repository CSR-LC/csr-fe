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
import { FilteredData } from '@shared/components/table-filter/table-filter.component';

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

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['data']) {
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
}
