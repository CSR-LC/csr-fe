import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';

@Component({
  selector: 'lc-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeaderComponent {
  public pageTitle$ = this.mainPageHeaderService.getPageTitle();
  @Output() toggleMenu = new EventEmitter<void>();

  constructor(private readonly mainPageHeaderService: MainPageHeaderService) {}
}
