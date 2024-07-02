import { DestroyRef, inject, Injectable } from '@angular/core';
import { ApiService } from '@app/my-applications/services/api/api.service';
import { map, Observable, tap } from 'rxjs';
import { MyApplicationsFilterProvider } from '@app/my-applications/services/providers/my-applications-filter-provider';
import { DropdownFilter } from '@shared/models/dropdown-filter';
import { MainPageHeaderService } from '@shared/services/main-page-header.service';
import { Application } from '@app/admin/types';
import { InfiniteScrollService } from '@shared/services/infinite-scroll/infinite-scroll.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class ControllerService {
  private destroyRef = inject(DestroyRef);
  private api = inject(ApiService);
  private headerService = inject(MainPageHeaderService);
  private infiniteScrollService = inject(InfiniteScrollService<Application>);
  private filterProvider = inject(MyApplicationsFilterProvider);

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

  setPageTitle() {
    this.headerService.setPageTitle('Мои заявки');
  }
}
