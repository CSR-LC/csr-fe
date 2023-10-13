import { User } from '@app/auth/models';
import { BlockUserAction } from '@app/admin/constants/block-user-action.enum';

export type BlockUserModalData = {
  user: User;
  action: BlockUserAction;
};
