import { ApplicationStatusName } from '../constants/applications-status-names';

export type ApplicationStatus = {
  changed_by: {
    id: number;
    name: string;
  };
  comment: string;
  created_at: Date;
  id: number;
  order_id: number;
  status: ApplicationStatusName;
};
