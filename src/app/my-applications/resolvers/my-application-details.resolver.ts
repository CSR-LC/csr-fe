import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Application } from '@app/admin/types';
import { CatalogApi } from '@app/catalog/services';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { MyApplicationsApi } from '../services';

export const myApplicationDetailsResolver: ResolveFn<Observable<Application | null>> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  apiService: MyApplicationsApi = inject(MyApplicationsApi),
  catalogApi: CatalogApi = inject(CatalogApi),
) => {
  const id = route.paramMap.get('id');

  if (!id) {
    throw new Error('Order ID is required');
  }

  return apiService.getOrder(id).pipe(
    switchMap((application: Application) => {
      return catalogApi.getPhotoById(application.equipments[0].photoID).pipe(
        map((res) => new Blob([res], { type: 'image/jpeg' })),
        map((photoBlob) => {
          const urlCreator = window.URL || window.webkitURL;
          const imageUrl = urlCreator.createObjectURL(photoBlob);

          const applicationWithImageUrl = { ...application };

          applicationWithImageUrl.equipments[0] = {
            ...applicationWithImageUrl.equipments[0],
            imageUrl,
          };

          return applicationWithImageUrl;
        }),
      );
    }),
    catchError(() => {
      return of(null);
    }),
  );
};
