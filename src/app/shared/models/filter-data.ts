import { TableRow } from '@shared/models/table-row';

export type FilteredData = {
  selectedValues: Set<string>;
  columnDef: keyof TableRow;
};
