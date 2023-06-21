import { Equipment } from './equipment';
import { OrderStatus } from './order-status';
import { UserShortInfo } from './user-short-info';

export type EquipmentOrder = {
  description: string;
  equipments: Equipment;
  id: number;
  is_first: boolean;
  last_status: OrderStatus;
  quantity: number;
  rent_end: string;
  rent_start: string;
  user: UserShortInfo;
};
