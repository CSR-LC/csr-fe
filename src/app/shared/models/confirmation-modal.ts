import { User } from '@app/user-profile/models/user';

export interface ConfirmationModalData {
  title: string;
  users: User[];
  reason: string;
  applyButtonText?: string;
  cancelButtonText?: string;
}
