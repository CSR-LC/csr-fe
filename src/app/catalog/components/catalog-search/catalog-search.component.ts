import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lc-catalog-search',
  templateUrl: './catalog-search.component.html',
  styleUrls: ['./catalog-search.component.scss']
})
export class CatalogSearchComponent {
  @Output('onSearch') onSearchEmit = new EventEmitter();

  onSearch(term: string) {
    this.onSearchEmit.emit(term);
  }
}
