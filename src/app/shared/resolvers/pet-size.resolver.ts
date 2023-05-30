import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PetSize } from '@app/management/models/management';
import { ApplicationResolverService } from '@shared/services/application-resolver/application-resolver.service';

@Injectable()
export class PetSizeResolver implements Resolve<PetSize[]> {
  constructor(private readonly applicationResolverService: ApplicationResolverService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PetSize[]> {
    return this.applicationResolverService.resolvePetSizes();
  }
}
