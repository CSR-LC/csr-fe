import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { Category } from '../models';
import { ApiService } from '../services/api/api.service';

@Injectable()
export class CategoriesResolver {
  constructor(private api: ApiService) {}

  resolve(): Observable<Category[]> {
    return this.api.getCategoriesContainEquipment().pipe(map((res) => res.items));
  }
}
