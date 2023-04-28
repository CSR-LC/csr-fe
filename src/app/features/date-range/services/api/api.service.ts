import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnavailablePeriods } from '../../models';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUnavailablePeriods(equipmentId?: number): Observable<UnavailablePeriods> {
    return this.httpClient.get<UnavailablePeriods>(`equipment/unavailability_periods/${equipmentId}`);
  }
}
