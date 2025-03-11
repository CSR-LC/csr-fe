import { ChangeDetectionStrategy, Component, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@app/catalog/models';
import { CatalogController } from '@app/catalog/services';
import { Store } from '@ngxs/store';
import { AuthState } from '@app/auth/store';
import { User } from '@app/auth/models';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lc-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CatalogController],
})
export class CategoriesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private controller = inject(CatalogController);
  private user: Signal<User | null | undefined> = toSignal(inject(Store).select(AuthState.user));
  categories: Category[] = [];

  ngOnInit() {
    this.controller.setPageTitle('Категории оборудования');
    this.categories = this.route.snapshot.data['activeCategories'];

    if (this.user()?.is_readonly && !localStorage.getItem('isUserBlocked')) {
      this.controller.openUserBlockedModal();
      localStorage.setItem('isUserBlocked', 'true');
    }
  }

  selectCategory(categoryId: number): void {
    this.controller.selectedCategoryId = categoryId;
  }
}
