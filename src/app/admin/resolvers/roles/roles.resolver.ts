import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '@app/auth/models/role';
import { RolesResolverService } from '@app/admin/services';
import { inject } from '@angular/core';

export const rolesResolver: ResolveFn<Observable<Role[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  rolesResolverService: RolesResolverService = inject(RolesResolverService),
) => {
  return rolesResolverService.getRoles();
};
