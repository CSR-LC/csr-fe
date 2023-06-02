import { Injectable } from '@angular/core';
import { EquipmentRentalInfo, EquipmentOrder, EquipmentFilter } from '@app/catalog/models';
import { DateRangeService } from '@app/features/date-range/services';
import { Select, Store } from '@ngxs/store';
import { map, Observable, switchMap } from 'rxjs';
import { CatalogApi } from '..';
import { Equipment } from '../../models/equipment';
import { CatalogState, GetCatalog } from '../../store';
import { UnavailableDates } from '@app/features/date-range/models';
import { PersonalInfoService } from '@app/shared/services/personal-info/personal-info.service';
import { User } from '@app/auth/models';
import { UserAction } from '@app/auth/store';

@Injectable()
export class ControllerService {
  @Select(CatalogState.catalog) catalog$!: Observable<Equipment[]>;

  constructor(
    private api: CatalogApi,
    private store: Store,
    private dateRangeService: DateRangeService,
    private personalInfoService: PersonalInfoService,
  ) {}

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

  filterEquipmentByCategory(categoryId: number) {
    const equipmentFilter: EquipmentFilter = { category: categoryId };

    this.api.filterEquipmentByCategory(equipmentFilter).subscribe((res) => {
      this.store.dispatch(new GetCatalog(res.items));
    });
  }

  getRentPeriods(equipmentId?: number, maxRentalPeriod?: number): Observable<UnavailableDates | null> {
    return this.api
      .getUnavailablePeriods(equipmentId)
      .pipe(
        switchMap((periods) => this.dateRangeService.openDateRangeModal(periods.items, equipmentId, maxRentalPeriod)),
      );
  }

  orderEquipment(selectedRentPeriod: UnavailableDates, equipmentId: number): Observable<EquipmentOrder> {
    const payload: EquipmentRentalInfo = {
      description: 'description',
      equipment_id: equipmentId,
      rent_end: selectedRentPeriod.end_date,
      rent_start: selectedRentPeriod.start_date,
    };

    return this.api.getCreatedOrder(payload);
  }

  openPersonalInfoModal(): Observable<void> {
    return this.personalInfoService.openPersonalInfoModal();
  }

  updateUserPersonalInfo(): Observable<void> {
    return this.personalInfoService.updateUserPersonalInfo();
  }

  setUser(user: User) {
    return this.store.dispatch(new UserAction(user));
  }
}
