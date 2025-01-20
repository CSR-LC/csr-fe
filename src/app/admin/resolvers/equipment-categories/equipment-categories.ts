import { Injectable, inject } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EquipmentResolverService } from '@app/admin/services/equipment-resolver/equipment-resolver.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquipmentCategoriesResolver {
  private readonly equipmentResolverService = inject(EquipmentResolverService);

  resolve(): Observable<unknown> {
    return this.equipmentResolverService.getEquipmentCategories();
  }
}
