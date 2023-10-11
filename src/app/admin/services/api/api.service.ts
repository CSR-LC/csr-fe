import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Equipment, EquipmentAvailability } from '@app/catalog/models/equipment';
import { BaseItemsResponse } from '@app/shared/types/base-items-response';
import { User } from '@app/auth/models';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllEquipment(): Observable<BaseItemsResponse<Equipment>> {
    return this.http.get<BaseItemsResponse<Equipment>>('equipment');
  }

  getEquipmentAvailable(period: EquipmentAvailability) {
    return this.http.post<string>(`equipment/availability`, period);
  }

  blockEquipment(id: number, period: EquipmentAvailability) {
    return this.http.put<string>(`equipment/availability/${id}`, period);
  }

  getAllUsers(): Observable<BaseItemsResponse<User>> {
    return this.http.get<BaseItemsResponse<User>>('v1/users');
  }
}
