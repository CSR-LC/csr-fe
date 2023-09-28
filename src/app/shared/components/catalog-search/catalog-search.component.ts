import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CatalogFilterService } from '@app/catalog/services/catalog/catalog-filter.service';

@Component({
  selector: 'lc-catalog-search',
  templateUrl: './catalog-search.component.html',
  styleUrls: ['./catalog-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSearchComponent implements OnInit {
  showSearchInput: boolean = false;
  @Output() inputDisplayed = new EventEmitter<boolean>();

  form = new FormGroup({
    searchValue: new FormControl(''),
  });

  constructor(private catalogFilterService: CatalogFilterService) {}

  onSearch() {
    this.catalogFilterService.searchInput = this.form.value.searchValue || '';
    this.catalogFilterService.filterEquipment();
  }

  toggle() {
    this.updateFormValue();
    this.showSearchInput = !this.showSearchInput;
    this.inputDisplayed.emit(this.showSearchInput);
  }

  ngOnInit() {
    this.updateFormValue();
  }

  private updateFormValue() {
    this.form.setValue({
      searchValue: this.catalogFilterService.searchInput,
    });
  }
}
