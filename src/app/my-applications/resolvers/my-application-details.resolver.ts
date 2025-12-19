import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Application } from '@app/admin/types';
import { Observable } from 'rxjs';
import { MyApplicationsController } from '../services';

export const myApplicationDetailsResolver: ResolveFn<Observable<Application | null>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  controller: MyApplicationsController = inject(MyApplicationsController),
) => {
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Order ID is required');
  }

  return controller.getApplicationWithImage(id);
};
