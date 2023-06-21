import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Tokens, User } from '../models';
import { rememberMeAction, ClearLoginData, Login, Logout, TokensAction, UserAction } from './actions';
import { AuthApi } from '../services';
import { tap } from 'rxjs';
import { LocalStorageKey } from '@shared/constants';

export type AuthStore = {
  tokens: Tokens | null;
  rememberMe: boolean;
  user: User | null;
};

const defaults: AuthStore = {
  tokens: null,
  rememberMe: true,
  user: null,
};

@State<AuthStore>({
  name: 'auth',
  defaults: {
    ...defaults,
  },
})
@Injectable()
export class AuthState {
  @Selector() static state(state: AuthStore) {
    return state;
  }

  @Selector() static tokens(state: AuthStore) {
    return state.tokens;
  }

  @Selector() static user(state: AuthStore) {
    return state.user;
  }

  @Selector()
  static isAuthenticated(state: AuthStore): boolean {
    return !!state.tokens;
  }

  @Selector([AuthState])
  static getRememberMe(state: AuthStore): boolean {
    return state.rememberMe;
  }

  constructor(private readonly authApi: AuthApi) {}

  @Action(Login)
  login(ctx: StateContext<AuthStore>, action: Login) {
    return this.authApi.login(action.credentials).pipe(
      tap((tokens) => {
        ctx.dispatch(new TokensAction(tokens));
      }),
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStore>) {
    const { refreshToken } = <Tokens>AuthState.tokens(ctx.getState());

    localStorage.clear();
    ctx.patchState({
      ...defaults,
    });

    return this.authApi.logout(refreshToken);
  }

  @Action(ClearLoginData)
  clearLoginData(ctx: StateContext<AuthStore>) {
    const { rememberMe } = ctx.getState();
    if (!rememberMe) {
      localStorage.clear();
      ctx.patchState({
        ...defaults,
      });
    }
  }

  @Action(TokensAction)
  tokens(ctx: StateContext<AuthStore>, action: TokensAction) {
    const state = ctx.getState();
    const tokens = action.tokens;
    localStorage.setItem(LocalStorageKey.tokens, JSON.stringify(tokens));
    ctx.patchState({
      ...state,
      tokens,
    });
  }

  @Action(rememberMeAction)
  rememberMe(ctx: StateContext<AuthStore>, action: rememberMeAction) {
    const state = ctx.getState();
    const rememberMe = action.rememberMe;
    ctx.patchState({
      ...state,
      rememberMe,
    });
  }

  @Action(UserAction)
  user(ctx: StateContext<AuthStore>, action: UserAction) {
    const state = ctx.getState();
    const user = action.user;
    ctx.patchState({
      ...state,
      user,
    });
  }
}
