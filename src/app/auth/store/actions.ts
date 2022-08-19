import {LoginInformation, Tokens} from "../models";

export class Login {
  static readonly type = '[Auth] Login';
  constructor(
    public credentials: LoginInformation
  ) {}
}

export class Logout {
  static readonly type = '[Auth] Logout'
}

export class TokensAction {
  static readonly type = '[Auth] TokensAction';
  constructor(
    public tokens: Tokens
  ) {}
}
