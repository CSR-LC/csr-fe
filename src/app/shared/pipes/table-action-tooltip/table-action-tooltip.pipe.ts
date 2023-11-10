import { Pipe, PipeTransform } from '@angular/core';
import { TableRow } from '@shared/models/table-row';
import { TableColumn } from '@shared/models/table-column';

@Pipe({
  name: 'tableActionTooltip',
})
export class TableActionTooltipPipe implements PipeTransform {
  transform(column: TableColumn, row: TableRow): string {
    return (row.actions && row.actions[column.columnDef]?.tooltip) || column.tooltip || '';
  }
}
