import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';
import { UntilDestroy } from '@shared/until-destroy/until-destroy';

@UntilDestroy
@Component({
  selector: 'lc-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {
  public pageTitle$ = this.mainPageHeaderService.getPageTitle();
  public filtersButtonDisplayed$ = this.mainPageHeaderService.getFiltersButtonDisplayed();
  @Output() toggleMenu = new EventEmitter<void>();

  constructor(private readonly mainPageHeaderService: MainPageHeaderService) {}

  onFiltersButtonToggle(): void {
    this.mainPageHeaderService.setFiltersButtonToggled(true);
  }
}
