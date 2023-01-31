import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '@app/catalog/models';

@Pipe({
  name: 'categoryPath',
})
export class CategoryPathPipe implements PipeTransform {
  transform(category: Category | undefined): string {
    return category?.id ? `/catalog/categories/${category.id}` : '/catalog/categories/all';
  }
}
