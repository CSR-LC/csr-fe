import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lc-catalog-search',
  templateUrl: './catalog-search.component.html',
  styleUrls: ['./catalog-search.component.scss'],
})
export class CatalogSearchComponent {
  showSearchInput: boolean = false;
  @Output() search = new EventEmitter();
  @Output() titleToggled = new EventEmitter();

  onSearch(term: string) {
    this.search.emit(term);
  }

  toggle() {
    this.showSearchInput = !this.showSearchInput;
    this.titleToggled.emit();
  }
}
