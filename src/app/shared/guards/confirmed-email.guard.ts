import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { AppRoutes } from '@shared/constants/routes.enum';

@Injectable()
export class ConfirmedEmail implements CanActivate {
  constructor(private readonly store: Store, private readonly router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    const user = this.store.snapshot().auth?.user;
    return user.is_registration_confirmed
      ? of(this.router.parseUrl(`${AppRoutes.Catalog}/${AppRoutes.Categories}`))
      : of(true);
  }
}
