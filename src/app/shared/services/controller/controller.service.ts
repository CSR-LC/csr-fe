import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { BaseItemsResponse, Equipment, EquipmentFilter } from '@shared/types';

@Injectable({
  providedIn: 'root',
})
export class ControllerService {
  constructor(private api: ApiService) {}

  filterEquipment(payload: EquipmentFilter): Observable<BaseItemsResponse<Equipment>> {
    return this.api.filterEquipment(payload);
  }
}
