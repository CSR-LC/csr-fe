import { UserEmbeddable } from './user-embeddable';

export type OrderStatus = {
  changed_by: UserEmbeddable;
  comment: string;
  created_at: string;
  id: number;
  order_id: number;
  status: string;
};
