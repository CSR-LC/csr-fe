import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableAction } from '@shared/models/table-action';
import { TableColumn } from '@shared/models/table-column';
import { TableRow } from '@app/shared/models/table-row';

@Component({
  selector: 'lc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() data: TableRow<T>[] = [];
  @Input() limit = 10;

  @Output() action = new EventEmitter<TableAction<T>>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  total = 0;
  dataSource!: MatTableDataSource<TableRow<T>>;

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
}
