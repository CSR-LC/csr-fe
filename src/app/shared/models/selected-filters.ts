import { TableRow } from '@shared/models/table-row';

export type SelectedFilters = {
  selectedValues: Set<string>;
  columnDef: keyof TableRow;
};
