import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PetSize } from '@app/shared/models/management';
import { ApplicationResolverService } from '@shared/services/application-resolver/application-resolver.service';

@Injectable()
export class PetSizeResolver {
  private readonly applicationResolverService = inject(ApplicationResolverService);

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PetSize[]> {
    return this.applicationResolverService.resolvePetSizes();
  }
}
