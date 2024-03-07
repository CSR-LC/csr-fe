import { Equipment } from '@app/catalog/models/equipment';
import { ApplicationStatus } from './application-status';
import { User } from '@app/auth/models';

export type Application = {
  description: string;
  equipments: Equipment[];
  id: number;
  is_first: boolean;
  last_status: ApplicationStatus;
  quantity: number;
  rent_end: string;
  rent_start: string;
  user: User;
};
