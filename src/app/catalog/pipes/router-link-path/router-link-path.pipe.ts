import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'routerLinkPath',
})
export class RouterLinkPathPipe implements PipeTransform {
  transform(path: string, categoryId: number | undefined): string {
    return categoryId ? `${path}/categories/${categoryId}` : `${path}`;
  }
}
