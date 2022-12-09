import { Injectable } from '@angular/core';
import { Category } from '@app/catalog/models';
import { CategoriesState, GetCategories } from '@app/catalog/store';
import { Select, Store } from '@ngxs/store';
import { map, Observable } from 'rxjs';
import { CatalogApi } from '..';
import { Equipment } from '../../models/equipment';
import { CatalogState, GetCatalog } from '../../store';

@Injectable()
export class ControllerService {
  @Select(CatalogState.catalog) catalog$!: Observable<Equipment[]>;
  @Select(CategoriesState.categories) categories$!: Observable<Category[]>;
  apiSearch: any;

  constructor(private api: CatalogApi, private store: Store) {}

  public getCatalog() {
    this.api.getCatalog().subscribe((res) => {
      this.store.dispatch(new GetCatalog(res.items));
    });
  }

  public getEquipmentItemInfo(id: number): Observable<Equipment> {
    return this.api.info(id);
  }

  public searchEquipment(term: string): Observable<Equipment[]> {
    const parametersEquipment: Partial<Equipment> = {
      name_substring: term,
    };

    return this.api.searchEquipment(parametersEquipment).pipe(map((res) => res.items));
  }

  getPhotoById(photoId: string): Observable<Blob> {
    return this.api.getPhotoById(photoId).pipe(map((res) => new Blob([res], { type: 'image/jpeg' })));
  }

  public getCategories() {
    this.api.getCategories().subscribe((res) => this.store.dispatch(new GetCategories(res.items)));
  }
}
