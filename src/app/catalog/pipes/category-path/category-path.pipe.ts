import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryPath',
})
export class CategoryPathPipe implements PipeTransform {
  transform(path: string, categoryId: number | undefined): string {
    return categoryId ? `${path}/categories/${categoryId}` : `${path}`;
  }
}
