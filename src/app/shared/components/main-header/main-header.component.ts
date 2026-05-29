import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output, inject } from '@angular/core';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';
import { UntilDestroy } from '@shared/until-destroy/until-destroy';
import { CatalogFilterService } from '@app/catalog/services/catalog/catalog-filter.service';

@UntilDestroy
@Component({
  selector: 'lc-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {
  private readonly mainPageHeaderService = inject(MainPageHeaderService);
  private readonly catalogFilterService = inject(CatalogFilterService);
  private readonly cdr = inject(ChangeDetectorRef);

  public pageTitle$ = this.mainPageHeaderService.getPageTitle();
  public pageTitleDisplayed$ = this.mainPageHeaderService.getPageTitleDisplayed();
  public actionsDisplayed$ = this.catalogFilterService.getActionsDisplayed();
  @Output() toggleMenu = new EventEmitter<void>();

  toggleTitle(inputDisplayed: boolean) {
    this.mainPageHeaderService.setPageTitleDisplayed(!inputDisplayed);
    this.cdr.detectChanges();
  }
}
