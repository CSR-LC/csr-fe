import { ActionEnum } from '@shared/constants/action.enum';

export interface TableColumn {
  header: string;
  columnDef: string;
  tooltip?: string;
  action?: ActionEnum;
  style: { [klass: string]: any } | null;
}
