import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { OrdersResolverService } from '@app/admin/services';
import { Observable } from 'rxjs';
import { ItemTranslated } from '@app/shared/types';

export const applicationStatusResolver: ResolveFn<Observable<ItemTranslated[]>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  applicationResolverService: OrdersResolverService = inject(OrdersResolverService),
) => {
  return applicationResolverService.getApplicationStatusNames();
};
