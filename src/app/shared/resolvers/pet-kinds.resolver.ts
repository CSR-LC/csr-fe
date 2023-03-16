import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { BaseKind } from '@app/management/models/management';
import { ApplicationResolverService } from '@shared/services/application-resolver/application-resolver.service';

@Injectable()
export class PetKindsResolver implements Resolve<BaseKind[]> {
  constructor(private readonly applicationResolverService: ApplicationResolverService) {}

  resolve(): Observable<BaseKind[]> {
    return this.applicationResolverService.resolvePetKinds();
  }
}
