import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {AuthState} from "../../auth/store";
import {Store} from "@ngxs/store";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    const hasSavedTokens = !!localStorage.getItem('tokens');
    return isAuthenticated || hasSavedTokens || this.router.parseUrl("/auth/login");
  }
}
