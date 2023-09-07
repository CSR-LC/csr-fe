import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PetSize } from '@app/management/models/management';
import { ApplicationResolverService } from '@shared/services/application-resolver/application-resolver.service';

@Injectable()
export class PetSizeResolver  {
  constructor(private readonly applicationResolverService: ApplicationResolverService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PetSize[]> {
    return this.applicationResolverService.resolvePetSizes();
  }
}
