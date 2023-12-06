import { Pipe, PipeTransform } from '@angular/core';
import { TableColumn } from '@app/shared/models/table-column';
import { TableRow } from '@app/shared/models/table-row';

@Pipe({
  name: 'tableDisableAction',
})
export class TableDisableActionPipe implements PipeTransform {
  transform(column: TableColumn, row: TableRow): boolean {
    return (row.actions && row.actions[column.columnDef].disabled) || false;
  }
}
