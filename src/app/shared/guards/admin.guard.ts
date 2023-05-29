import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthState } from '@app/auth/store';
import { Store } from '@ngxs/store';
import { UserRole } from '../constants/user-role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly store: Store, private readonly router: Router) {}

  canActivate(): boolean | UrlTree {
    const user = this.store.selectSnapshot(AuthState.user);
    if (user?.role?.slug === UserRole.admin) {
      return true;
    }
    return this.router.parseUrl('/forbidden');
  }
}
