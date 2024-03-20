import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TableRow } from '@shared/models/table-row';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, startWith, tap } from 'rxjs';
import { TableFilterOption } from '@shared/models/table-filter-option';
import { SelectedFilters } from '@shared/models/selected-filters';

@UntilDestroy
@Component({
  selector: 'lc-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableFilterComponent {
  @Input()
  set isAllFiltersReset(isAllFiltersReset: boolean) {
    if (!isAllFiltersReset) return;

    this.filterString = '';
    this.searchControl.setValue('');
    this.currentFilteredOptions = [];
    this.selectedOptions = [];
    this.options.forEach((option) => (option.selected = false));
  }

  @Input()
  set data(data: TableRow[]) {
    this.options = this.createOptions(data, this.columnDef, this.emptyValue);

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith<string>(''),
      debounceTime(500),
      map((value) => (typeof value === 'string' ? value : this.filterString)),
      map((filter) => this.filter(filter)),
      tap(() => this.updateSelectAllOptionStatus()),
      untilDestroyed(this),
    );
  }

  @Input()
  columnDef: keyof TableRow = '';
  @Input()
  placeholder: string = '';
  @Input()
  activeFilters!: Map<keyof TableRow, Set<string>>;
  @Output()
  filterSelected = new EventEmitter<SelectedFilters>();

  searchControl = new FormControl();
  filteredOptions: Observable<TableFilterOption[]> | undefined;
  selectedOptions: TableFilterOption[] = [];
  options: TableFilterOption[] = [];
  filterString = '';
  selectAllOption: TableFilterOption = { row: { [this.columnDef]: 'Выбрать все' }, selected: false };
  currentFilteredOptions: TableFilterOption[] = [];
  emptyValue = 'Пусто';

  displayOption(option: TableFilterOption): string {
    return option && option.row && option.row[this.columnDef] ? `${option.row[this.columnDef]}` : '';
  }

  private filter(filter: string): TableFilterOption[] {
    this.filterString = filter;

    this.currentFilteredOptions =
      filter.length > 0
        ? this.options.filter((option) => {
            return option.row[this.columnDef].toString().toLowerCase().includes(filter.toLowerCase());
          })
        : this.options.slice();

    return this.currentFilteredOptions;
  }

  optionClicked(event: MouseEvent, option: TableFilterOption) {
    event.stopPropagation();
    this.toggleSelection(option);
  }

  toggleSelection(option: TableFilterOption) {
    if (option === this.selectAllOption) {
      this.toggleSelectAllOption();
    } else {
      this.toggleIndividualOption(option);
    }

    this.updateSelectAllOptionStatus();
  }

  toggleSelectAllOption() {
    const selectAll = !this.selectAllOption.selected;
    this.selectAllOption.selected = selectAll;
    this.currentFilteredOptions.forEach((option) => (option.selected = selectAll));
    this.selectedOptions = selectAll ? this.currentFilteredOptions.slice() : [];
    this.passFilteredData();
  }

  toggleIndividualOption(option: TableFilterOption) {
    option.selected = !option.selected;

    if (option.selected) {
      this.selectedOptions.push(option);
    } else {
      const i = this.selectedOptions.findIndex((value) => value.row[this.columnDef] === option.row[this.columnDef]);
      this.selectedOptions.splice(i, 1);
    }

    this.passFilteredData();
  }

  private updateSelectAllOptionStatus() {
    this.selectAllOption.selected = this.currentFilteredOptions.every((option) => option.selected);
  }

  private passFilteredData() {
    const selectedValues = new Set(this.selectedOptions.map((option) => option.row[this.columnDef]));
    this.filterSelected.emit({ selectedValues, columnDef: this.columnDef });
  }

  private getUniqueValues(
    data: TableRow[],
    columnDef: keyof TableRow,
    emptyValue: string,
  ): Map<string, TableFilterOption> {
    const map = new Map();

    for (const row of data) {
      const value = row[columnDef];

      if (!map.has(value)) {
        map.set(value, { row, displayValue: value ? value : emptyValue, selected: false });
      }
    }

    return map;
  }

  private createOptions(data: TableRow[], columnDef: keyof TableRow, emptyValue: string): TableFilterOption[] {
    const uniqueValues = this.getUniqueValues(data, columnDef, emptyValue);
    return Array.from(uniqueValues.values());
  }

  resetFilter() {
    this.selectAllOption.selected = false;
    this.currentFilteredOptions.forEach((option) => (option.selected = false));
    this.selectedOptions = [];
    this.passFilteredData();
  }
}
