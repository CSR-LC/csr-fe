import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Equipment } from '@app/catalog/models/equipment';
import { BaseItemsResponse } from '@app/shared/types/base-items-response';
import { EquipmentStatus } from '@app/admin/types/equipment-status';
import { Category } from '@app/catalog/models';
import { UnavailableDates } from '@app/features/date-range/models';
import { Period } from '@app/shared/models/period';
import { User } from '@app/auth/models';
import { UploadPhotoResponse } from '@app/shared/types/upload-photo-response';
import { NewEquipment } from '@app/shared/models/equipment';
import { Role } from '@app/auth/models/role';
import { Application } from '@app/admin/types/application';
import { Item } from '@app/shared/types';
import { ChangeStatusBody } from '@app/admin/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private static USERS_BASE_URL = 'v1/users';
  private static ROLES_BASE_URL = 'v1/roles';
  private static MANAGEMENT_BASE_URL = 'v1/management';

  constructor(private http: HttpClient) {}

  getAllEquipment(): Observable<BaseItemsResponse<Equipment>> {
    // TODO: remove when solved
    const params = new HttpParams().set('limit', 1000).set('has_equipments', 'true');
    return this.http.get<BaseItemsResponse<Equipment>>('equipment', { params });
  }

  getUnavailablePeriodsById(equipmentId: number): Observable<BaseItemsResponse<UnavailableDates>> {
    return this.http.get<BaseItemsResponse<UnavailableDates>>(`/equipment/unavailability_periods/${equipmentId}`);
  }

  archiveEquipment(equipmentId: number): Observable<void> {
    return this.http.post<void>(`/equipment/achive/${equipmentId}/`, {
      equipmentId,
    });
  }

  blockEquipment(id: number, period: Period): Observable<void> {
    const body = {
      end_date: period.endDate,
      start_date: period.startDate,
    };
    return this.http.post<void>(`/equipment/${id}/blocking`, body);
  }

  unblockEquipment(id: number): Observable<void> {
    return this.http.post<void>(`/equipment/${id}/unblocking`, {});
  }

  uploadPhoto(file: File): Observable<UploadPhotoResponse> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<UploadPhotoResponse>('equipment/photos', formData);
  }

  registerEquipment(equipment: NewEquipment): Observable<Equipment> {
    return this.http.post<Equipment>('equipment', equipment);
  }

  editEquipment(equipment: NewEquipment, id: number): Observable<Equipment> {
    return this.http.put<Equipment>(`equipment/${id}`, equipment);
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
    return this.http.get<BaseItemsResponse<User>>(ApiService.USERS_BASE_URL);
  }

  updateUserReadonlyAccess(userId: number, isReadonly: boolean) {
    const body = {
      is_readonly: isReadonly,
    };

    return this.http.put<string>(`${ApiService.USERS_BASE_URL}/${userId}/readonly-access`, body);
  }

  deleteUser(userId: number): Observable<string> {
    return this.http.delete<string>(`${ApiService.USERS_BASE_URL}/${userId}`);
  }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(ApiService.ROLES_BASE_URL);
  }

  assignRoleToUser(userId: number, roleId: number): Observable<string> {
    const body = {
      roleId,
    };
    return this.http.post<string>(`${ApiService.MANAGEMENT_BASE_URL}/users/${userId}/role`, body);
  }

  getAllOrders(): Observable<BaseItemsResponse<Application>> {
    // TODO: remove when solved
    const params = new HttpParams().set('limit', 1000).set('has_equipments', 'true');
    return this.http.get<BaseItemsResponse<Application>>('/management/orders', { params });
  }

  getApplicationStatuses(): Observable<Item[]> {
    return this.http.get<Item[]>('/v1/status_names');
  }

  editApplicationStatus(statusInfo: ChangeStatusBody): Observable<string> {
    return this.http.post<string>('/v1/order_statuses/', statusInfo);
  }
}
