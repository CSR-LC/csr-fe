import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogController } from '../../services';
import { UntilDestroy, untilDestroyed } from '@app/shared/until-destroy/until-destroy';

@UntilDestroy
@Component({
  selector: 'lc-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class CatalogComponent implements OnInit, OnDestroy {
  catalog$ = this.controller.catalog$;
  noResultMessage: string = 'Извините, по вашему запросу ничего не найдено. Попробуйте изменить критерии запроса.';

  constructor(private controller: CatalogController) {
    this.controller.setPageTitle('Каталог');
  }

  ngOnInit() {
    this.controller.filterEquipment();

    this.controller.displayCatalogActions(true);

    this.controller.equipmentFilter$.pipe(untilDestroyed(this)).subscribe(() => {
      this.controller.filterEquipment();
    });
  }

  ngOnDestroy() {
    this.controller.displayCatalogActions(false);
    this.controller.displayPageTitle(true);
  }
}
