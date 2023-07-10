import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState, AuthStore, Login, Logout, TokensAction, UserAction } from '@app/auth/store';
import { LoginInformation, Tokens } from '@app/auth/models';
import { Router } from '@angular/router';
import { LocalStorageKey } from '../../constants';
import { AuthApi } from '@app/auth/services';
import { Observable, finalize, of, switchMap, take } from 'rxjs';
import { BlockUiService } from '../block-ui/block-ui.service';
import { AppRoutes } from '@app/shared/constants/routes.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly freeEndpoints = ['v1/login', 'v1/logout', 'v1/refresh', 'v1/users', 'password_reset'];

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly authApi: AuthApi,
    private readonly blockUiService: BlockUiService,
  ) {}

  login(credentials: LoginInformation): Observable<AuthStore> {
    return this.store.dispatch(new Login(credentials));
  }

  logout(): Observable<unknown> {
    return this.store.dispatch(new Logout());
  }

  logoutWithNavigation(): void {
    this.blockUiService.block();
    this.logout()
      .pipe(
        take(1),
        finalize(() => this.blockUiService.unBlock()),
      )
      .subscribe(() => this.router.navigate([AppRoutes.Auth]));
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
    return tokens ? tokens : this.getTokensFromLocalStorage();
  }

  getTokensFromLocalStorage(): Tokens | null {
    const savedTokens = localStorage.getItem(LocalStorageKey.tokens);
    return savedTokens ? JSON.parse(savedTokens) : savedTokens;
  }

  checkTokens(): Observable<{ auth: AuthStore } | null> {
    let tokens: Tokens | null = this.store.selectSnapshot(AuthState.tokens);
    if (tokens) return of(this.store.snapshot());

    tokens = this.getTokensFromLocalStorage();
    return tokens ? this.saveTokens(tokens) : of(null);
  }

  setCurrentUser(): Observable<{ auth: AuthStore }> {
    return this.authApi.getCurrentUser().pipe(
      switchMap((user) => {
        return this.store.dispatch(new UserAction(user));
      }),
    );
  }

  saveTokens(tokens: Tokens): Observable<{ auth: AuthStore }> {
    return this.store.dispatch(new TokensAction(tokens));
  }

  navigateToLogin() {
    this.router.navigate(['/auth']);
  }
}
