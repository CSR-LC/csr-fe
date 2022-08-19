import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { Tokens } from "../models";
import { Login, Logout, TokensAction } from "./actions";
import { AuthApi } from '../services';
import { tap } from "rxjs";
import { LocalStorageKey } from "@shared/constants";

export type AuthStore = {
  tokens: Tokens | null;
}

@State<AuthStore>({
  name: 'auth',
  defaults: {
    tokens: null,
  }
}) @Injectable()
export class AuthState {

  @Selector() static tokens(state: AuthStore) {
    return state.tokens;
  }

  @Selector()
  static isAuthenticated(state: AuthStore): boolean {
    return !!state.tokens;
  }

  constructor(
    private readonly authApi: AuthApi
  ) {}

  @Action(Login)
  login(ctx: StateContext<AuthStore>, action: Login) {
    return this.authApi.login(action.credentials).pipe(
      tap((tokens) => {
        ctx.dispatch(
          new TokensAction(tokens)
        );
      }),
    )
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStore>) {
    localStorage.clear();
    ctx.patchState({
      tokens: null,
    })
  }

  @Action(TokensAction)
  tokens(ctx: StateContext<AuthStore>, action: TokensAction) {
    const tokens = action.tokens;
    localStorage.setItem(
      LocalStorageKey.tokens,
      JSON.stringify(tokens)
    );
    ctx.patchState({
      tokens,
    })
  }
}
