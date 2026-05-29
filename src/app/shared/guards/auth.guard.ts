import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthState } from '@app/auth/store';
import { Store } from '@ngxs/store';
import { AuthService } from '@shared/services/auth-service/auth-service.service';
import { Observable, of, switchMap } from 'rxjs';

@Injectable()
export class AuthGuard {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

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
