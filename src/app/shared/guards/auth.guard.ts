import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthState } from '@app/auth/store';
import { Store } from '@ngxs/store';
import { AuthService } from '@shared/services/auth-service/auth-service.service';
import { Observable, of, switchMap, tap } from 'rxjs';

@Injectable()
export class AuthGuard {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.checkTokens().pipe(
      switchMap((state) => {
        return state?.auth.tokens ? this.authService.setCurrentUser() : of(null);
      }),
      switchMap((res) => {
        return res?.auth.user ? of(true) : of(this.router.parseUrl('/auth'));
      }),
    );
  }
}
