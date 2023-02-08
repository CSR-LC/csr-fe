import { Injectable } from '@angular/core';
import { EquipmentFilter } from '@app/catalog/models';
import { Select, Store } from '@ngxs/store';
import { map, Observable, of } from 'rxjs';
import { CatalogApi } from '..';
import { Equipment } from '../../models/equipment';
import { CatalogState, GetCatalog } from '../../store';
import { BaseKind, PetSize } from '@app/catalog/models/filter';

@Injectable()
export class ControllerService {
  @Select(CatalogState.catalog) catalog$!: Observable<Equipment[]>;

  constructor(private api: CatalogApi, private store: Store) {}

  getCatalog() {
    this.api.getCatalog().subscribe((res) => {
      this.store.dispatch(new GetCatalog(res.items));
    });
  }

  getEquipmentItemInfo(id: number): Observable<Equipment> {
    return this.api.info(id);
  }

  searchEquipment(term: string): Observable<Equipment[]> {
    const parametersEquipment: Partial<Equipment> = {
      name_substring: term,
    };

    return this.api.searchEquipment(parametersEquipment).pipe(map((res) => res.items));
  }

  getPhotoById(photoId: string): Observable<Blob> {
    return this.api.getPhotoById(photoId).pipe(map((res) => new Blob([res], { type: 'image/jpeg' })));
  }

  getPetKinds(): Observable<BaseKind[]> {
    return this.api.getPetKinds();
  }

  getPetSizes(): Observable<PetSize[]> {
    return this.api.getPetSizes();
  }

  filterEquipment(filterValue: EquipmentFilter) {
    this.api.filterEquipment(filterValue).subscribe((res) => {
      this.store.dispatch(new GetCatalog(res.items));
    });
  }

  // filterEquipmentCount(filterValue: EquipmentFilter) {
  //   return this.api.filterEquipment(filterValue).pipe(map((res) => res.items));
  // }
}
