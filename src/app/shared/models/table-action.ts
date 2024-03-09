import { TableRow } from './table-row';

export interface TableAction<T = any> {
  row: TableRow<T>;
  action: string;
}
