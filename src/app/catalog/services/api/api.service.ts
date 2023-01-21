import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../../models/equipment';
import { BaseItemsResponse } from '@shared/types';
import { Category, EquipmentFilter } from '@app/catalog/models';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  info(id: number): Observable<Equipment> {
    return this.httpClient.get<Equipment>(`/api/equipment/${id}`);
  }

  getCatalog(): Observable<BaseItemsResponse<Equipment>> {
    // TODO: remove prams, when pagination is ready
    const params = new HttpParams().set('limit', 1000);
    return this.httpClient.get<BaseItemsResponse<Equipment>>('/api/equipment', { params });
  }

  searchEquipment(params: Partial<Equipment>): Observable<BaseItemsResponse<Equipment>> {
    return this.httpClient.post<BaseItemsResponse<Equipment>>('/api/equipment/search', params);
  }

  getPhotoById(photoId: string): Observable<ArrayBuffer> {
    return this.httpClient.get(`/api/equipment/photos/${photoId}`, {
      responseType: 'arraybuffer',
    });
  }

  getCategoriesContainEquipment(): Observable<BaseItemsResponse<Category>> {
    // TODO: remove params, when pagination is ready
    const params = new HttpParams().set('limit', 1000).set('has_equipments', 'true');
    return this.httpClient.get<BaseItemsResponse<Category>>(`/api/equipment/categories`, { params });
  }

  filterEquipmentByCategory(payload: EquipmentFilter): Observable<BaseItemsResponse<Equipment>> {
    return this.httpClient.post<BaseItemsResponse<Equipment>>(`/api/equipment/search`, payload);
  }
}
