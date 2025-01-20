import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BaseKind } from '@app/shared/models/management';
import { ApplicationResolverService } from '@shared/services/application-resolver/application-resolver.service';

@Injectable()
export class PetKindsResolver {
  private readonly applicationResolverService = inject(ApplicationResolverService);

  resolve(): Observable<BaseKind[]> {
    return this.applicationResolverService.resolvePetKinds();
  }
}
