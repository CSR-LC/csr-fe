import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EquipmentManagement, Kind } from '../../models/management';

@Injectable()
export class ApiService {

  constructor(
      private httpClient: HttpClient
  ) { }
  
  getKinds(): Observable<Kind[]> {
     return this.httpClient.get<Kind[]>("/api/equipment/kinds");
  }

  registerEquipment(equipment: EquipmentManagement) {
    return this.httpClient.post<EquipmentManagement>("/api/equipment", equipment);
  }
}
