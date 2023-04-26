import { ActionEnum } from './action.enum';

export interface TableData {
  [key: string]: any;
}

export interface TableColumn {
  header: string;
  columnDef: string;
  tooltip?: string;
  action?: ActionEnum;
  style: { [klass: string]: any } | null;
}

export interface ActionEmit<T> {
  row: T;
  action: ActionEnum;
}
