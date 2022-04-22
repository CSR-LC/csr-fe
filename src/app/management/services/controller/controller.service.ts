import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EquipmentManagement, Kind } from '../../models/management';

import { ApiService } from '../api/api.service';

@Injectable()
export class ControllerService {
  constructor(
    private readonly api: ApiService,
    private readonly router: Router
  ) { }

  getKinds(): Observable<Kind[]> {
    return this.api.getKinds();
  }

  cancel() {
    this.router.navigate(['/catalog']);
  }

  registerEquipment(equipment: EquipmentManagement) {
    this.api.registerEquipment(equipment);
    this.router.navigate(['/catalog']);
    console.log("Оборудование зарегистрировано успешно");
  }
}
