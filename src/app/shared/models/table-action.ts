import { TableRow } from './table-row';

export interface TableAction<T> {
  row: TableRow<T>;
  action: string;
}
