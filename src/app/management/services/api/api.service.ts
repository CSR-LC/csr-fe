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
    //  return this.httpClient.get<Kind[]>("https://csr.golangforall.com/api/equipment/kinds");
    return of([{
      id: 1,
      max_reservation_time: 12000000,
      max_reservation_units: 10,
      name: "Ловушки"
    }]);
  }

  registerEquipment(equipment: EquipmentManagement) {
    console.log(equipment);
    // return this.httpClient.post<EquipmentManagement>("https://csr.golangforall.com/api/equipment/createnewequipment", equipment)
  }
}
