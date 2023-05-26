import { ActionEnum } from '../constants/action.enum';

export interface TableAction<T> {
  row: T;
  action: ActionEnum;
}
