import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthState } from '@app/auth/store';
import { Store } from '@ngxs/store';
import { AuthService } from '@shared/services/auth-service/auth-service.service';
import { Observable, of, switchMap } from 'rxjs';

@Injectable()
export class AuthGuard {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.checkTokens().pipe(
      switchMap(() => {
        return this.store.selectSnapshot(AuthState.tokens) ? this.authService.setCurrentUser() : of(null);
      }),
      switchMap(() => {
        return this.store.selectSnapshot(AuthState.user) ? of(true) : of(this.router.parseUrl('/auth'));
      }),
    );
  }
}
