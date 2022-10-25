import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {AuthState} from "@app/auth/store";
import {Store} from "@ngxs/store";
import {AuthService} from "@shared/services/auth-service/auth-service.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  canActivate(): boolean | UrlTree {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isAuthenticated);

    if (isAuthenticated) return true;

    const tokens = this.authService.getTokens();

    return !!tokens || this.router.parseUrl("/auth");
  }
}
