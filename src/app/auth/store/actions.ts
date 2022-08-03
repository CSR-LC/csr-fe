import {LoginInformation, Tokens} from "../models";

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public credentials: LoginInformation) {}
}
