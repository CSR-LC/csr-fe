import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Category } from '../models';
import { ApiService } from '../services/api/api.service';

@Injectable()
export class CategoriesResolver implements Resolve<Category[]> {
  constructor(private api: ApiService) {}

  resolve(): Observable<Category[]> {
    return this.api.getCategoriesContainEquipment().pipe(map((res) => res.items));
  }
}
