import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState, AuthStore, Login, Logout, TokensAction, UserAction } from '@app/auth/store';
import { LoginInformation, Tokens } from '@app/auth/models';
import { Router } from '@angular/router';
import { LocalStorageKey, USERS_ENDPOINT } from '../../constants';
import { AuthApi } from '@app/auth/services';
import { Observable, of, switchMap } from 'rxjs';
import { HttpRequest } from '@angular/common/http';
import { ConfirmationModalComponent } from '@shared/components';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly freeEndpoints = ['v1/login', 'v1/logout', 'v1/refresh', USERS_ENDPOINT, 'password_reset'];

  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly authApi: AuthApi,
    private readonly dialog: MatDialog,
  ) {}

  login(credentials: LoginInformation): Observable<AuthStore> {
    return this.store.dispatch(new Login(credentials));
  }

  logout(): Observable<unknown> {
    return this.store.dispatch(new Logout());
  }

  isRequestNeedsTokens(request: HttpRequest<any>): boolean {
    if (request.url === USERS_ENDPOINT) {
      return this.isUsersRequestNeedsTokens(request);
    }
    return !this.freeEndpoints.includes(request.url);
  }

  private isUsersRequestNeedsTokens(request: HttpRequest<any>): boolean {
    return !(request.method === 'POST');
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

  openLogoutConfirmationModal(): Observable<boolean> {
    return this.dialog
      .open(ConfirmationModalComponent, {
        data: {
          title: 'Выход',
          body: 'Вы уверены, что хотите выйти?',
          applyButtonText: 'Выйти',
          cancelButtonText: 'Остаться',
        },
      })
      .afterClosed();
  }
}
