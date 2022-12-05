import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseKind, EquipmentKind, PetSize } from '../../models/management';
import { UploadPhotoResponse } from '@app/management/types';
import { BaseItemsResponse } from '@shared/types';
import { EquipmentSubCategory } from '@app/management/types/equipment-sub-category';
import { NewEquipment } from '@app/management/models/equipment';
import { Equipment } from '@app/catalog/models/equipment';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getEquipmentCategories(): Observable<BaseItemsResponse<EquipmentKind>> {
    return this.httpClient.get<BaseItemsResponse<EquipmentKind>>('/api/equipment/categories');
  }

  getEquipmentSubCategoryById(id: number): Observable<EquipmentSubCategory[]> {
    return this.httpClient.get<EquipmentSubCategory[]>(`api/equipment/categories/${id}/subcategories`);
  }

  registerEquipment(equipment: NewEquipment): Observable<Equipment> {
    return this.httpClient.post<Equipment>('/api/equipment', equipment);
  }

  getPetKinds(): Observable<BaseKind[]> {
    return this.httpClient.get<BaseKind[]>('api/pet_kind');
  }

  getPetSizes(): Observable<PetSize[]> {
    return this.httpClient.get<PetSize[]>('api/pet_size');
  }

  uploadPhoto(formData: FormData): Observable<UploadPhotoResponse> {
    return this.httpClient.post<UploadPhotoResponse>('api/equipment/photos', formData);
  }

  getEquipmentStatuses(): Observable<BaseKind[]> {
    return this.httpClient.get<BaseKind[]>('api//equipment/statuses');
  }
}
