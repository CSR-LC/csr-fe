import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '@app/admin/types';
import { Observable } from 'rxjs';
import { BaseItemsResponse } from '@shared/types';

@Injectable()
export class ApiService {
  private readonly http = inject(HttpClient);

  private static ORDERS_BASE_URL = 'v1/orders';

  getOrders(status = 'all', limit = 10, offset = 0): Observable<BaseItemsResponse<Application>> {
    return this.http.get<BaseItemsResponse<Application>>(
      `${ApiService.ORDERS_BASE_URL}?status=${status}&limit=${limit}&offset=${offset}`,
    );
  }
}
