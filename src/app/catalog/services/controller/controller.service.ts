import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CatalogApi } from '..';
import { Equipment } from '../../models/equipment';
import { CatalogState, GetCatalog } from '../../store';

@Injectable()
export class ControllerService {
  @Select(CatalogState.catalog) catalog$!: Observable<Equipment[]>;
  
  constructor(
    private api: CatalogApi,
    private store: Store
  ) { }

  public getCatalog() {
    this.api.getCatalog().subscribe(catalog => {
      this.store.dispatch(new GetCatalog(catalog));
    });
  }

  public getEquipmentItemInfo(term: number): Observable<Equipment> {
    return this.api.info(term);
  }

  public searchEquipment(term: string): Observable<Equipment[]> {
    const parametersEquipment:Partial<Equipment> = {
      name_substring: term,
    }

    return  this.api.searchEquipment(parametersEquipment);
  }
}
