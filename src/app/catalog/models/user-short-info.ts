import { User } from '@app/auth/models';

export type UserShortInfo = Pick<User, 'id' | 'name'>;
