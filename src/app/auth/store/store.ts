import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Tokens} from "../models";
import {Login} from "./actions";
import { AuthApi } from '../services';
import {take, tap} from "rxjs";

type AuthStore = {
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
    private readonly authService: AuthApi
  ) {}

  @Action(Login)
  login(ctx: StateContext<AuthStore>, action: Login) {
    return this.authService.login(action.credentials).pipe(
      tap((tokens) => {
        localStorage.setItem(
          'tokens',
          JSON.stringify(tokens)
        );
        ctx.patchState({
          tokens,
        })
      }),
      take(1),
    )
  }
}
