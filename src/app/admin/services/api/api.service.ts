import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '@app/catalog/models/equipment';
import { BaseItemsResponse } from '@app/shared/types/base-items-response';
import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { Category } from '@app/catalog/models';
import { UnavailableDates } from '@app/features/date-range/models';
import { Period } from '@app/shared/models/period';
import { User } from '@app/auth/models';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllEquipment(): Observable<BaseItemsResponse<Equipment>> {
    return this.http.get<BaseItemsResponse<Equipment>>('equipment');
  }

  getUnavailablePeriodsById(equipmentId: number): Observable<BaseItemsResponse<UnavailableDates>> {
    return this.http.get<BaseItemsResponse<UnavailableDates>>(`/equipment/unavailability_periods/${equipmentId}`);
  }

  archiveEquipment(equipmentId: number): Observable<unknown> {
    return this.http.post(`/equipment/achive/${equipmentId}/`, {
      equipmentId,
    });
  }

  blockEquipment(id: number, period: Period) {
    const body = {
      end_date: period.endDate,
      start_date: period.startDate,
    };
    return this.http.post<string>(`/equipment/${id}/blocking`, body);
  }

  getEquipmentStatuses(): Observable<EquipmentStatus[]> {
    return this.http.get<EquipmentStatus[]>('/equipment/status_names');
  }

  getEquipmentCategories(): Observable<BaseItemsResponse<Category>> {
    return this.http.get<BaseItemsResponse<Category>>('/equipment/categories');
  }

  getEquipmentUnavailabilityPeriods(equipmentId: number): Observable<BaseItemsResponse<UnavailableDates[]>> {
    return this.http.get<BaseItemsResponse<UnavailableDates[]>>(`/equipment/unavailability_periods/${equipmentId}`);
  }

  getAllUsers(): Observable<BaseItemsResponse<User>> {
    return this.http.get<BaseItemsResponse<User>>('v1/users');
  }
}
