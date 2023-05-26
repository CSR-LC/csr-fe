import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TableAction } from '@shared/models/table-action';
import { TableColumn } from '@shared/models/table-column';

@Component({
  selector: 'lc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements AfterViewInit, OnChanges {
  @Input() columns!: TableColumn[];
  @Input() data: T[] = [];
  @Input() total = 0;
  @Input() page = 0;
  @Input() limit = 10;
  @Output() setPage = new EventEmitter<number>();
  @Output() action = new EventEmitter<TableAction<T>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<T>();

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['data']) {
      this.dataSource = new MatTableDataSource(this.data);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSetPage(e: PageEvent) {
    this.setPage.emit(e.pageIndex);
  }

  get displayColumns() {
    return this.columns.map((column: TableColumn) => column.columnDef);
  }

  onEditCell(data: TableAction<T>) {
    this.action.emit(data);
  }
}
