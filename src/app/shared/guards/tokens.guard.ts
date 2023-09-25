import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '@shared/services/auth-service/auth-service.service';

@Injectable()
export class TokensGuard {
  constructor(private readonly router: Router, private readonly authService: AuthService) {}

  canActivate(): boolean | UrlTree {
    const tokens = this.authService.getTokens();

    return !tokens || this.router.parseUrl('/');
  }
}
