import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { EquipmentMock } from '@app/admin/mocks/admin-equipment.mock';

@Injectable()
export class ApiService {
  getAllUsers() {
    return of(EquipmentMock);
  }
}
