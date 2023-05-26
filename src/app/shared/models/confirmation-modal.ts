import { User } from '@app/user-profile/models/user';

export type ConfirmationModalData = {
  title: string;
  name: string;
  reason: string;
  applyButtonText?: string;
  cancelButtonText?: string;
};
