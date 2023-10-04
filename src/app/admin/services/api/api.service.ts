import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Equipment, EquipmentAvailability } from '@app/catalog/models/equipment';
import { BaseItemsResponse } from '@app/shared/types/base-items-response';
import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { Category } from '@app/catalog/models';

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
  getEquipmentStatuses(): Observable<EquipmentStatus[]> {
    return this.http.get<EquipmentStatus[]>('/equipment/status_names');
  }

  getEquipmentCategories(): Observable<BaseItemsResponse<Category>> {
    return this.http.get<BaseItemsResponse<Category>>('/equipment/categories');
  }
}
