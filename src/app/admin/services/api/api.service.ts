import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Equipment, EquipmentAvailability } from '@app/catalog/models/equipment';
import { BaseItemsResponse } from '@app/shared/types/base-items-response';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllEquipment(page: number = 0, limit: number = 10): Observable<BaseItemsResponse<Equipment>> {
    const offset = limit * page;
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this.http.get<BaseItemsResponse<Equipment>>('equipment', { params });
  }

  getEquipmentAvailable(period: EquipmentAvailability) {
    return this.http.post<string>(`equipment/availability`, period);
  }

  blockEquipment(id: number, period: EquipmentAvailability) {
    return this.http.put<string>(`equipment/availability/${id}`, period);
  }
}
