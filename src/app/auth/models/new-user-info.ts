import { UserType } from './user-type';

// TODO: correct the interface when back remove required fields
export type NewUserInfo = {
  login: string;
  email: string;
  password: string;
  type: UserType;
  name: string;
};
