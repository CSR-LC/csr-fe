import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { categoryContainsAllEquipment } from '@app/catalog/constants';
import { Category } from '@app/catalog/models';
import { CatalogController } from '@app/catalog/services';

@Component({
  selector: 'lc-category-set',
  templateUrl: './category-set.component.html',
  styleUrls: ['./category-set.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySetComponent implements AfterViewInit, OnInit {
  @ViewChild('listCategories') listCategories?: ElementRef<HTMLDivElement>;
  @ViewChildren('categoryElement') categoriesElements?: QueryList<ElementRef<HTMLDivElement>>;

  categories: Category[] = [];
  selectedCategoryId: number = 0;

  readonly marginLeft = 25;

  constructor(private route: ActivatedRoute, private controller: CatalogController) {}

  ngOnInit() {
    this.selectedCategoryId = this.controller.selectedCategoryId;
    this.categories = [categoryContainsAllEquipment, ...this.route.snapshot.data['activeCategories']];
  }

  ngAfterViewInit() {
    if (!this.categoriesElements) return;

    const activeCategory = this.categoriesElements.find((el: ElementRef<HTMLDivElement>) => {
      return el.nativeElement.classList.contains('active');
    });

    if (!activeCategory) return;

    const activeCategoryX = activeCategory.nativeElement.getBoundingClientRect().x;

    this.scroll(activeCategoryX);
  }

  scrollCategories(categoryId: number, selectedCategoryElement: HTMLDivElement) {
    this.selectedCategoryId = categoryId;
    this.controller.selectedCategoryId = categoryId;
    this.controller.filterEquipment();

    if (!this.listCategories) return;

    const activeCategoryX = selectedCategoryElement.getBoundingClientRect().x;
    const scrollDistance = this.listCategories.nativeElement.scrollLeft + activeCategoryX;
    this.scroll(scrollDistance);
  }

  private scroll(scrollDistance: number) {
    if (!this.listCategories) return;

    this.listCategories.nativeElement.scroll({
      left: scrollDistance - this.marginLeft,
      behavior: 'smooth',
    });
  }
}
