import { UserType } from './user-type';

export type NewUserInfo = {
  login: string;
  email: string;
  password: string;
  type: UserType;
};
