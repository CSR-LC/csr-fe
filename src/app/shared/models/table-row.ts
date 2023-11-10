import { TableActionState } from '@shared/models/table-action-state';

export type TableRow = {
  [key: string]: any;
  actions?: {
    [key: string]: TableActionState;
  };
};
