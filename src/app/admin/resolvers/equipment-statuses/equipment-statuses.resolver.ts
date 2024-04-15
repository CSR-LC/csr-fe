import { Injectable } from '@angular/core';
import { EquipmentResolverService } from '@app/admin/services/equipment-resolver/equipment-resolver.service';
import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EquipmentsStatusesResolver {
  constructor(private readonly equipmentResolverService: EquipmentResolverService) {}

  resolve(): Observable<EquipmentStatus[]> {
    return this.equipmentResolverService.getEquipmentStatuses();
  }
}
