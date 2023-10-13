import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lc-page-not-found',
  templateUrl: './page-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFoundComponent {}
