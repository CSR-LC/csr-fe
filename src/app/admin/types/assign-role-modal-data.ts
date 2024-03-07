import { Role, User } from '@app/auth/models';

export type AssignRoleModalData = {
  roles: Role[];
  users: User[];
};
