import { TableActionState } from '@shared/models/table-action-state';

export type TableRow = {
  [key: string]: any;
  selected: boolean;
  actions?: {
    [key: string]: TableActionState;
  };
};
