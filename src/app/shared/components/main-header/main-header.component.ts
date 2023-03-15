import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '@app/auth/store';
import { Observable, Subject } from 'rxjs';
import { FilterService } from '@app/shared/services/filter/filter.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lc-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  @Select(AuthState.isAuthenticated)
  public isAuthenticated$!: Observable<boolean>;

  @Input() pageTitle!: string;

  constructor(private filterService: FilterService) {}

  hide?: boolean;
  private unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.filterService.hide$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      this.hide = value;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
