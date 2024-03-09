import { RowAction } from './row-action';

export type TableRow<T = any> = {
  entity: T;
  [key: string]: any;
  actions?: RowAction;
};
