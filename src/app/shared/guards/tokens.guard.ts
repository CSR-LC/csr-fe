import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '@shared/services/auth-service/auth-service.service';

@Injectable()
export class TokensGuard {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  canActivate(): boolean | UrlTree {
    const tokens = this.authService.getTokens();

    return !tokens || this.router.parseUrl('/');
  }
}
