import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthState } from '@app/auth/store';
import { Store } from '@ngxs/store';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly store: Store, private readonly router: Router) {}

  canActivate(): boolean | UrlTree {
    const user = this.store.selectSnapshot(AuthState.user);

    return user?.role?.slug === 'administrator' || this.router.parseUrl('/catalog');
  }
}
