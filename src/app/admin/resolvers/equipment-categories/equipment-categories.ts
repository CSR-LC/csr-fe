import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EquipmentResolverService } from '@app/admin/services/equipment-resolver/equipment-resolver.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquipmentCategoriesResolver {
  constructor(private readonly equipmentResolverService: EquipmentResolverService) {}

  resolve(): Observable<unknown> {
    return this.equipmentResolverService.getEquipmentCategories();
  }
}
