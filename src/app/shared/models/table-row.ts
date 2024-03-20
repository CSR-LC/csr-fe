import { Entity } from './entity';
import { RowAction } from './row-action';

export type TableRow<T = Entity> = {
  entity: T;
  [key: string]: any;
  actions?: RowAction;
};
