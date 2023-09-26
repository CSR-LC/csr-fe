import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'lc-catalog-search',
  templateUrl: './catalog-search.component.html',
  styleUrls: ['./catalog-search.component.scss'],
})
export class CatalogSearchComponent {
  showSearchInput: boolean = false;
  @Output() search = new EventEmitter();

  form = new FormGroup({
    searchValue: new FormControl(''),
  });

  onSearch() {
    this.search.emit(this.form.value.searchValue);
  }

  toggle() {
    this.showSearchInput = !this.showSearchInput;
  }
}
