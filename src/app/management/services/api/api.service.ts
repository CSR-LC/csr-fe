import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, of} from 'rxjs';

import {BaseKind, EquipmentKind, EquipmentManagement, PetSize} from '../../models/management';
import {UploadPhotoResponse} from "@app/management/types";

@Injectable()
export class ApiService {

  constructor(
      private httpClient: HttpClient
  ) { }

  getEquipmentKinds(): Observable<EquipmentKind[]> {
     return this.httpClient.get<EquipmentKind[]>("/api/equipment/kinds");
  }

  registerEquipment(equipment: EquipmentManagement) {
    return this.httpClient.post<EquipmentManagement>("/api/equipment", equipment);
  }

  getPetKinds(): Observable<BaseKind[]> {
    return this.httpClient.get<BaseKind[]>('api/pet_kind');
  }

  getPetSizes(): Observable<PetSize[]> {
    return this.httpClient.get<PetSize[]>('api/pet_size');
  }

  uploadPhoto(formData: FormData): Observable<UploadPhotoResponse> {
    return this.httpClient.post<UploadPhotoResponse>('api/equipment/photos', formData)
  }
}
