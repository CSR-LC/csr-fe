import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'lc-catalog-search',
  templateUrl: './catalog-search.component.html',
  styleUrls: ['./catalog-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSearchComponent implements OnInit {
  showSearchInput: boolean = false;
  @Input() searchValue: string = '';
  @Output() search = new EventEmitter();
  @Output() inputDisplayed = new EventEmitter<boolean>();

  form = new FormGroup({
    searchValue: new FormControl(''),
  });

  onSearch() {
    this.search.emit(this.form.value.searchValue);
  }

  toggle() {
    this.showSearchInput = !this.showSearchInput;
    this.inputDisplayed.emit(this.showSearchInput);
  }

  ngOnInit() {
    this.form.setValue({
      searchValue: this.searchValue,
    });
  }
}
