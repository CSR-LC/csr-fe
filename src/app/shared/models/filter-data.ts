import { TableRow } from '@shared/models/table-row';

export type FilteredData = {
  rows: TableRow[];
  columnDef: keyof TableRow;
};
