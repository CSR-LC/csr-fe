import { AdminTableAction } from '@shared/constants';

export interface TableColumn {
  header: string;
  columnDef: string;
  tooltip?: string;
  action?: AdminTableAction;
  style: { [klass: string]: any } | null;
}
