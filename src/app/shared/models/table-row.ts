import { TableActionState } from '@shared/models/table-action-state';

export type TableRow = {
  entity?: any;
  [key: string]: any;
  actions?: {
    [key: string]: TableActionState;
  };
};
