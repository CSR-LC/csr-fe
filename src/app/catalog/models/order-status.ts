import { UserShortInfo } from './user-short-info';

export type OrderStatus = {
  changed_by: UserShortInfo;
  comment: string;
  created_at: string;
  id: number;
  order_id: number;
  status: string;
};
