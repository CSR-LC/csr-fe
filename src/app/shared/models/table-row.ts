import { RowAction } from './row-action';

export type TableRow = {
  entity?: any;
  [key: string]: any;
  actions?: RowAction;
};
