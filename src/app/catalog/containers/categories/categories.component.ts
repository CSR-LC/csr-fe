import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Category } from '@app/catalog/models';
import { CatalogController } from '@app/catalog/services';
import { CategoriesState } from '@app/catalog/store';
import { MainPageHeaderService } from '@app/shared/services/main-page-header.service';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'lc-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class CategoriesComponent implements OnInit {
  @Select(CategoriesState.categories) categories$!: Observable<Category[]>;

  constructor(private controller: CatalogController, private mainPageHeaderService: MainPageHeaderService) {
    mainPageHeaderService.setPageTitle('Категории оборудования');
  }

  ngOnInit() {
    this.controller.getCategories();
  }
}
