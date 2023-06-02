import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../../models/equipment';
import { BaseItemsResponse } from '@shared/types';
import { Category, EquipmentRentalInfo, EquipmentOrder, EquipmentFilter } from '@app/catalog/models';
import { UnavailablePeriods } from '@app/features/date-range/models';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  info(id: number): Observable<Equipment> {
    return this.httpClient.get<Equipment>(`equipment/${id}`);
  }

  getCatalog(): Observable<BaseItemsResponse<Equipment>> {
    // TODO: remove prams, when pagination is ready
    const params = new HttpParams().set('limit', 1000);
    return this.httpClient.get<BaseItemsResponse<Equipment>>('equipment', { params });
  }

  searchEquipment(params: Partial<Equipment>): Observable<BaseItemsResponse<Equipment>> {
    return this.httpClient.post<BaseItemsResponse<Equipment>>('equipment/search', params);
  }

  getPhotoById(photoId: string): Observable<ArrayBuffer> {
    return this.httpClient.get(`equipment/photos/${photoId}`, {
      responseType: 'arraybuffer',
    });
  }

  getCategoriesContainEquipment(): Observable<BaseItemsResponse<Category>> {
    // TODO: remove params, when pagination is ready
    const params = new HttpParams().set('limit', 1000).set('has_equipments', 'true');
    return this.httpClient.get<BaseItemsResponse<Category>>(`equipment/categories`, { params });
  }

  filterEquipmentByCategory(payload: EquipmentFilter): Observable<BaseItemsResponse<Equipment>> {
    return this.httpClient.post<BaseItemsResponse<Equipment>>(`equipment/search`, payload);
  }

  getUnavailablePeriods(equipmentId?: number): Observable<UnavailablePeriods> {
    return this.httpClient.get<UnavailablePeriods>(`equipment/unavailability_periods/${equipmentId}`);
  }

  getCreatedOrder(payload: EquipmentRentalInfo): Observable<EquipmentOrder> {
    return this.httpClient.post<EquipmentOrder>('v1/orders', payload);
  }
}
