import { TableRow } from '@shared/models/table-row';

export type TableFilterOption = {
  row: TableRow;
  displayValue?: string;
  selected: boolean;
};
