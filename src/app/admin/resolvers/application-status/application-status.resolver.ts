import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { ApplicationResolverService } from '@app/admin/services';
import { Observable } from 'rxjs';
import { ItemTranslated } from '@app/shared/types';

export const applicationStatusResolver: ResolveFn<Observable<ItemTranslated[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  applicationResolverService: ApplicationResolverService = inject(ApplicationResolverService),
) => {
  return applicationResolverService.getApplicationStatusNames();
};
