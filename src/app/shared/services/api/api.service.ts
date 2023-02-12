import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseKind, PetSize, EquipmentFilter, BaseItemsResponse, Equipment } from '@shared/types';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getPetKinds(): Observable<BaseKind[]> {
    return this.httpClient.get<BaseKind[]>('/pet_kind');
  }

  getPetSizes(): Observable<PetSize[]> {
    return this.httpClient.get<PetSize[]>('/pet_size');
  }

  filterEquipment(payload: EquipmentFilter): Observable<BaseItemsResponse<Equipment>> {
    return this.httpClient.post<BaseItemsResponse<Equipment>>(`equipment/search`, payload);
  }
}
