import { AdminTableAction } from '@shared/constants/admin-table-action.enum';

export interface TableAction<T> {
  row: T;
  action: AdminTableAction;
}
