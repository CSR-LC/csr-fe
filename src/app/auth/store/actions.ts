import { LoginInformation, Tokens } from '../models';

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public credentials: LoginInformation) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class ClearLoginData {
  static readonly type = '[Auth] ClearLoginData'
}

export class TokensAction {
  static readonly type = '[Auth] TokensAction';
  constructor(public tokens: Tokens) {}
}

export class BeOnlineAction {
  static readonly type = '[Auth] BeOnlineAction';
  constructor(
    public beOnline: boolean
  ) {}
}
