import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthState } from '@app/auth/store';
import { Store } from '@ngxs/store';
import { UserRole } from '../constants/user-role.enum';

@Injectable()
export class AdminGuard {
  constructor(private readonly store: Store, private readonly router: Router) {}

  canActivate(): boolean | UrlTree {
    const user = this.store.selectSnapshot(AuthState.user);
    const role = user?.role?.name;
    if (role === UserRole.admin || role === UserRole.manager) {
      return true;
    }
    return this.router.parseUrl('/forbidden');
  }
}
