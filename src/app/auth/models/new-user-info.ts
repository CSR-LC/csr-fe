import {UserType} from "./user-type";

// TODO: correct the interface when back remove required fields
export type NewUserInfo = {
  email: string;
  password: string;
  type: UserType;
  name: string;
}
