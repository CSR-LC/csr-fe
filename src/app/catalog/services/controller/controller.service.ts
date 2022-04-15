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


  public onOrder() {
    this.api.order();
  }

  public onInfo() {
    this.api.info();
  }
}
