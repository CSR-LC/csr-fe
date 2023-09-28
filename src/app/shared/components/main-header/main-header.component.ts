import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
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
  public pageTitle$ = this.mainPageHeaderService.getPageTitle();
  public pageTitleDisplayed$ = this.mainPageHeaderService.getPageTitleDisplayed();
  public actionsDisplayed$ = this.catalogFilterService.getActionsDisplayed();
  @Output() toggleMenu = new EventEmitter<void>();

  constructor(
    private readonly mainPageHeaderService: MainPageHeaderService,
    private readonly catalogFilterService: CatalogFilterService,
  ) {}

  toggleTitle(inputDisplayed: boolean) {
    this.mainPageHeaderService.setPageTitleDisplayed(!inputDisplayed);
  }
}
