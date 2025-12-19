import { DestroyRef, inject, Injectable } from '@angular/core';
import { ApiService } from '@app/my-applications/services/api/api.service';
import { catchError, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { MyApplicationsFilterProvider } from '@app/my-applications/services/providers/my-applications-filter-provider';
import { DropdownFilter } from '@shared/models/dropdown-filter';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { Application } from '@app/admin/types';
import { InfiniteScrollService } from '@shared/services/infinite-scroll/infinite-scroll.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { NotificationsService } from '@shared/services/notifications/notifications.service';
import { DateRangeService } from '@app/features/date-range/services/controller/date-range.service';
import { CatalogApi } from '@app/catalog/services';
import { DateRangePurpose } from '@app/features/date-range/models/date-rrange-purpose';
import { DateRange } from '@angular/material/datepicker';

@Injectable()
export class ControllerService {
  private destroyRef = inject(DestroyRef);
  private api = inject(ApiService);
  private headerService = inject(MainPageHeaderService);
  private infiniteScrollService = inject(InfiniteScrollService<Application>);
  private filterProvider = inject(MyApplicationsFilterProvider);
  private dialog = inject(MatDialog);
  private notificationService = inject(NotificationsService);
  private dateRangeService = inject(DateRangeService);
  private catalogApi = inject(CatalogApi);

  applications$ = this.infiniteScrollService.items$;
  hasMore$ = this.infiniteScrollService.hasMore$;
  loading$ = this.infiniteScrollService.loading$;

  getApplications(status = 'all', limit = 10, offset = 0): Observable<Application[]> {
    return this.api.getOrders(status, limit, offset).pipe(map((response) => response.items));
  }

  loadMoreApplications(status = 'all', limit = 10) {
    if (this.infiniteScrollService.loading || !this.infiniteScrollService.hasMore) {
      return;
    }

    const offset = this.infiniteScrollService.items.length;
    this.infiniteScrollService.setLoading(true);

    this.getApplications(status, limit, offset)
      .pipe(
        tap((items) => {
          this.infiniteScrollService.addItems(items);
          this.infiniteScrollService.setLoading(false);
          this.infiniteScrollService.setHasMore(items.length > 0);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        error: () => {
          this.infiniteScrollService.setLoading(false);
        },
      });
  }

  resetApplications() {
    this.infiniteScrollService.reset();
  }

  getFilter(): Observable<DropdownFilter> {
    return this.filterProvider.getFilter();
  }

  setPageTitle(title: string = 'Мои заявки') {
    this.headerService.setPageTitle(title);
  }

  deleteApplication(applicationId: number): Observable<boolean> {
    return this.dialog
      .open(ConfirmationModalComponent, {
        autoFocus: false,
        data: {
          title: 'Удалить заявку',
          body: 'Ваша заявка будет отозвана, её нельзя будет восстановить.',
          applyButtonText: 'Удалить',
          cancelButtonText: 'Отменить',
        },
      })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap(() => this.api.deleteOrder(applicationId.toString())),
        tap(() => {
          this.notificationService.openSuccess('Заявка удалена успешно');
        }),
        map(() => true),
        catchError(() => {
          this.notificationService.openError('Не удалось удалить заявку');
          return of(false);
        }),
      );
  }

  editApplicationPeriod(application: Application): Observable<Application | null> {
    const equipment = application.equipments?.[0];
    
    if (!equipment || !equipment.id) {
      this.notificationService.openError('Не удалось загрузить данные оборудования');
      return of(null);
    }

    const equipmentId = equipment.id;

    // Fetch full equipment details to get maximumDays
    return this.catalogApi.info(equipmentId).pipe(
      switchMap((fullEquipment) => {
        const maxRentalPeriod = fullEquipment.maximumDays;

        if (!maxRentalPeriod) {
          this.notificationService.openError('Не удалось загрузить данные оборудования');
          return of(null);
        }

        // Parse dates and create DateRange for current period
        const startDate = new Date(application.rent_start);
        const endDate = new Date(application.rent_end);
        
        console.log('Current application dates:', {
          rent_start: application.rent_start,
          rent_end: application.rent_end,
          startDate,
          endDate
        });

        const currentPeriod = new DateRange<Date>(startDate, endDate);

        return this.catalogApi.getUnavailablePeriods(equipmentId).pipe(
          switchMap((periods) => {
            console.log('Unavailable periods from API:', periods);
            
            const dateRangeData = {
              headerText: 'Редактировать период аренды',
              buttonText: 'Подтвердить изменения',
              maxRentalPeriod,
              unavailableDates: periods.items || [],
              purpose: DateRangePurpose.rent,
              selectedPeriod: currentPeriod,
            };

            console.log('Opening date range modal with data:', dateRangeData);

            return this.dateRangeService.openDateRangeModal(dateRangeData);
          }),
          switchMap((selectedPeriod) => {
            if (!selectedPeriod) return of(null);

            const payload = {
              description: application.description,
              quantity: application.quantity,
              rent_end: selectedPeriod.end_date,
              rent_start: selectedPeriod.start_date,
            };

            return this.api.updateOrder(application.id.toString(), payload).pipe(
              switchMap((updatedApplication) => {
                // Fetch photo and add imageUrl to the updated application
                return this.addImageUrlToApplication(updatedApplication);
              }),
              tap(() => {
                this.notificationService.openSuccess('Период аренды изменен успешно');
              }),
              catchError(() => {
                this.notificationService.openError('Не удалось изменить период аренды');
                return of(null);
              }),
            );
          }),
        );
      }),
      catchError(() => {
        this.notificationService.openError('Не удалось загрузить данные оборудования');
        return of(null);
      }),
    );
  }

  getApplicationWithImage(orderId: string): Observable<Application | null> {
    return this.api.getOrder(orderId).pipe(
      switchMap((application: Application) => {
        return this.addImageUrlToApplication(application);
      }),
      catchError(() => {
        return of(null);
      }),
    );
  }

  addImageUrlToApplication(application: Application): Observable<Application> {
    const photoID = application.equipments[0]?.photoID;
    
    if (!photoID) {
      return of(application);
    }

    return this.catalogApi.getPhotoById(photoID).pipe(
      map((res) => new Blob([res], { type: 'image/jpeg' })),
      map((photoBlob) => {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(photoBlob);

        return {
          ...application,
          equipments: [{
            ...application.equipments[0],
            imageUrl,
          }],
        };
      }),
      catchError(() => {
        // If photo fetch fails, return application without imageUrl
        return of(application);
      }),
    );
  }
}
