import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CatalogFilterService } from '@app/catalog/services/catalog/catalog-filter.service';

@Component({
  selector: 'lc-catalog-search',
  templateUrl: './catalog-search.component.html',
  styleUrls: ['./catalog-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogSearchComponent implements OnInit {
  private catalogFilterService = inject(CatalogFilterService);

  showSearchInput: boolean = false;
  @Output() inputDisplayed = new EventEmitter<boolean>();

  form = new FormGroup({
    searchValue: new FormControl(''),
  });

  ngOnInit() {
    this.updateFormValue(this.catalogFilterService.searchInput);
    if (this.catalogFilterService.searchInput) {
      this.toggle();
    }
  }

  onSearch() {
    this.catalogFilterService.searchInput = this.form.value.searchValue || '';
    this.catalogFilterService.filterEquipment();
  }

  toggle() {
    this.showSearchInput = !this.showSearchInput;
    if (!this.showSearchInput) this.resetSearch();
    this.inputDisplayed.emit(this.showSearchInput);
  }

  private resetSearch() {
    if (!this.catalogFilterService.searchInput) return;
    this.updateFormValue('');
    this.onSearch();
  }

  private updateFormValue(value: string) {
    this.form.setValue({
      searchValue: value,
    });
  }
}
