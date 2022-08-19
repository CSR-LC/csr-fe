import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { AuthState, AuthStore, Login, Logout, TokensAction } from "@app/auth/store";
import { LoginInformation, Tokens } from "@app/auth/models";
import { Router } from "@angular/router";
import { LocalStorageKey } from "../../constants";
import { AuthApi } from '@app/auth/services';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly freeEndpoints = [
    '/api/v1/login',
    '/api/v1/refresh',
    '/api/v1/users',
  ]

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly authApi: AuthApi
  ) {}

  login(credentials: LoginInformation): Observable<AuthStore> {
    return this.store.dispatch(new Login(credentials));
  }

  logout(): Observable<unknown> {
    return this.store.dispatch(new Logout);
  }

  isRequestNeedsTokens(url: string): boolean {
    return !this.freeEndpoints.includes(url);
  }

  getAccessToken(): string | null {
    const tokens = this.getTokens();
    return tokens ? tokens.accessToken : tokens;
  }

  getRefreshToken(): string | null {
    const tokens = this.getTokens();
    return tokens ? tokens.refreshToken : tokens;
  }

  refreshToken(refreshToken: string): Observable<Tokens> {
    return this.authApi.refreshToken(refreshToken);
  }

  getTokens(): Tokens | null {
    let tokens = this.store.selectSnapshot(AuthState.tokens);
    return tokens ? tokens : this.getTokensFromLocalStorage();;
  }

  getTokensFromLocalStorage(): Tokens | null {
    const savedTokens = localStorage.getItem(LocalStorageKey.tokens);
    return savedTokens ? JSON.parse(savedTokens) : savedTokens;
  }

  checkTokens() {
    if (this.store.selectSnapshot(AuthState.tokens)) return;
    const tokens = this.getTokensFromLocalStorage();
    if (tokens) {
      this.saveTokens(tokens);
      return;
    }
    this.navigateToLogin();
  }

  saveTokens(tokens: Tokens): Observable<any> {
    return this.store.dispatch(new TokensAction(tokens));
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
