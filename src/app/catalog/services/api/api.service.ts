import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipment } from '../../models/equipment';
import {BaseItemsResponse} from "@shared/types";

@Injectable()
export class ApiService {

  constructor(
     private httpClient: HttpClient
  ) { }

 public info(id: number): Observable<Equipment>{
   return this.httpClient.get<Equipment>(`/api/equipment/${id}`);
 }

 public getCatalog(): Observable<BaseItemsResponse<Equipment>> {
    return this.httpClient.get<BaseItemsResponse<Equipment>>("/api/equipment");
 }

  public searchEquipment(params: Partial<Equipment>): Observable<Equipment[]> {
    return this.httpClient.post<Equipment[]>("/api/equipment/search", params);
  }
}
