import { Injectable } from '@angular/core';
import { EquipmentFilter, EquipmentOrder, EquipmentRentalInfo } from '@app/catalog/models';
import { DateRangeService } from '@app/features/date-range/services';
import { Select, Store } from '@ngxs/store';
import { map, Observable, of, switchMap } from 'rxjs';
import { CatalogApi } from '..';
import { Equipment } from '../../models/equipment';
import { CatalogState, GetCatalog } from '../../store';
import { UnavailableDates } from '@app/features/date-range/models';
import { PersonalInfoService } from '@app/shared/services/personal-info/personal-info.service';
import { User } from '@app/auth/models';
import { AuthState, UserAction } from '@app/auth/store';
import { InfoService } from '@app/shared/services/info/info.service';
import { InfoData } from '@app/shared/models';
import { CatalogFilterService } from '@app/catalog/services/catalog/catalog-filter.service';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { DateRangePurpose } from '@app/features/date-range/models/date-rrange-purpose';

@Injectable()
export class ControllerService {
  @Select(CatalogState.catalog) catalog$!: Observable<Equipment[]>;
  @Select(AuthState.hasUserPesonalData) hasUserPesonalData$!: Observable<boolean>;
  @Select(CatalogState.equipmentFilter) equipmentFilter$!: Observable<EquipmentFilter>;

  constructor(
    private api: CatalogApi,
    private store: Store,
    private dateRangeService: DateRangeService,
    private personalInfoService: PersonalInfoService,
    private infoService: InfoService,
    private catalogFilterService: CatalogFilterService,
    private mainPageHeaderService: MainPageHeaderService,
  ) {}

  getCatalog() {
    this.api.getCatalog().subscribe((res) => {
      this.store.dispatch(new GetCatalog(res.items));
    });
  }

  getEquipmentItemInfo(id: number): Observable<Equipment> {
    return this.api.info(id);
  }

  getPhotoById(photoId: string): Observable<Blob> {
    return this.api.getPhotoById(photoId).pipe(map((res) => new Blob([res], { type: 'image/jpeg' })));
  }

  getRentPeriods(equipmentId?: number, maxRentalPeriod?: number): Observable<UnavailableDates | null> {
    if (!maxRentalPeriod) return of(null);

    return this.api.getUnavailablePeriods(equipmentId).pipe(
      switchMap((periods) => {
        const dateRangeData = {
          headerText: 'Период аренды',
          buttonText: 'Подтвердить период аренды',
          maxRentalPeriod,
          unavailableDates: periods.items,
          purpose: DateRangePurpose.rent,
        };

        return this.dateRangeService.openDateRangeModal(dateRangeData);
      }),
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

  updateUserPersonalInfo(): Observable<void> {
    return this.personalInfoService.updateUserPersonalInfo();
  }

  setUser(user: User) {
    return this.store.dispatch(new UserAction(user));
  }

  openInfoModal() {
    const infoData: InfoData = {
      headerText: 'Спасибо!',
      infoMessage: `Вы успешно отправили заявку на аренду оборудования. Наши менеджеры скоро свяжутся с Вами.
      Историю и статус ваших заявок вы можете посмотреть в разделе`,
      buttonOkText: 'Ок',
      infoLink: `Мои
      заявки`,
    };

    this.infoService.openInfoModal(infoData);
  }

  addPersonalInfo(period: UnavailableDates | null): Observable<UnavailableDates | null> {
    if (!period) return of(null);

    return this.hasUserPesonalData$.pipe(
      switchMap((isPersonalData) => {
        return !isPersonalData ? this.personalInfoService.openPersonalInfoModal() : of(null);
      }),
      switchMap(() => this.hasUserPesonalData$),
      switchMap((isPersonalData) => {
        return isPersonalData ? of(period) : of(null);
      }),
    );
  }

  displayCatalogActions(isDisplayed: boolean): void {
    this.catalogFilterService.setActionsDisplayed(isDisplayed);
  }

  filterEquipment(): void {
    this.catalogFilterService.filterEquipment();
  }

  set selectedCategoryId(categoryId: number) {
    this.catalogFilterService.selectedCategoryId = categoryId;
  }

  set equipmentFilter(equipmentFilter: EquipmentFilter) {
    this.catalogFilterService.equipmentFilter = equipmentFilter;
  }

  set searchInput(searchInput: string) {
    this.catalogFilterService.searchInput = searchInput;
  }

  get selectedCategoryId(): number {
    return this.catalogFilterService.selectedCategoryId;
  }

  setPageTitle(title: string): void {
    this.mainPageHeaderService.setPageTitle(title);
  }

  displayPageTitle(isDisplayed: boolean) {
    this.mainPageHeaderService.setPageTitleDisplayed(isDisplayed);
  }
}
