import { Type } from '@angular/core';

export type TableColumn = {
  header: string;
  columnDef: string;
  tooltip?: string;
  action?: string;
  style: { [klass: string]: any } | null;
  filterComponent?: Type<any>;
};
