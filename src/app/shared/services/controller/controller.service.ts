import { Injectable } from '@angular/core';
import { EquipmentFilter } from '@app/catalog/models';
import { Select, Store } from '@ngxs/store';
import { map, Observable, of } from 'rxjs';
import { CatalogApi } from '..';
import { BaseKind, PetSize } from '@app/catalog/models/filter';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  // @Select(CatalogState.catalog) catalog$!: Observable<Equipment[]>;

  constructor(private api: CatalogApi, private store: Store) {}

  getPetKinds(): Observable<BaseKind[]> {
    return this.api.getPetKinds();
  }

  getPetSizes(): Observable<PetSize[]> {
    return this.api.getPetSizes();
  }

  // filterEquipment(filterValue: EquipmentFilter) {
  //   this.api.filterEquipment(filterValue).subscribe((res) => {
  //     this.store.dispatch(new GetCatalog(res.items));
  //   });
  // }

  // filterEquipmentCount(filterValue: EquipmentFilter) {
  //   return this.api.filterEquipment(filterValue).pipe(map((res) => res.items));
  // }
}
