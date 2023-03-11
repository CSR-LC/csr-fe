import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipmentFilter, BaseItemsResponse, Equipment } from '@shared/types';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  filterEquipment(payload: EquipmentFilter): Observable<BaseItemsResponse<Equipment>> {
    return this.httpClient.post<BaseItemsResponse<Equipment>>(`equipment/search`, payload);
  }
}
