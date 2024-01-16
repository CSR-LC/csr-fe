import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, of, startWith, switchMap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { TableFilterService } from '@app/admin/services/table-filter/table-filter.service';
import { TableRow } from '@shared/models/table-row';

@UntilDestroy
@Component({
  selector: 'lc-table-search-filter',
  templateUrl: './table-search-filter.component.html',
  styleUrls: ['./table-search-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableSearchFilterComponent implements OnInit {
  @Input()
  property!: string;
  @Input()
  placeholder!: string;

  searchControl = new FormControl();
  filteredOptions$: Observable<TableRow[]> = of([]);
  selectedOptions: TableRow[] = [];
  options: TableRow[] = [];
  filterString = '';
  selectAllOption: TableRow = { [this.property]: 'Выбрать все', selected: false };
  currentFilteredOptions: TableRow[] = [];

  constructor(private tableFilterService: TableFilterService) {}

  ngOnInit() {
    this.tableFilterService.filteredOptions$
      .pipe(
        switchMap((filteredOptions) => {
          return this.tableFilterService.numberOfAppliedFilters > 0
            ? of(filteredOptions)
            : this.tableFilterService.initialOptions$;
        }),
        untilDestroyed(this),
      )
      .subscribe((options) => {
        this.options = options;
      });
    this.filteredOptions$ = this.searchControl.valueChanges.pipe(
      startWith<string>(''),
      map((value) => (typeof value === 'string' ? value : this.filterString)),
      map((filter) => this.filter(filter)),
      debounceTime(500),
      untilDestroyed(this),
    );
  }

  displayFn(row: TableRow): string {
    return row && row[this.property] ? `${row[this.property]}` : '';
  }

  optionClicked(event: MouseEvent, TableRow: TableRow) {
    event.stopPropagation();
    this.toggleSelection(TableRow);
  }

  toggleSelection(option: TableRow) {
    if (option === this.selectAllOption) {
      this.toggleSelectAllOption();
    } else {
      this.toggleIndividualOption(option);
    }

    this.updateSelectAllOptionStatus();

    if (this.selectedOptions.length === 0) {
      this.tableFilterService.deleteOptions(this.property);
    } else {
      this.tableFilterService.setFilteredOptions(this.property, this.selectedOptions);
    }
  }

  private toggleSelectAllOption() {
    const selectAll = !this.selectAllOption.selected;
    this.selectAllOption.selected = selectAll;
    this.currentFilteredOptions.forEach((option) => (option.selected = selectAll));
    this.selectedOptions = selectAll ? this.currentFilteredOptions.slice() : [];
  }

  private toggleIndividualOption(option: TableRow) {
    option.selected = !option.selected;

    if (option.selected) {
      this.selectedOptions.push(option);
    } else {
      const i = this.selectedOptions.findIndex((value) => value['id'] === option['id']);
      this.selectedOptions.splice(i, 1);
    }
  }

  private updateSelectAllOptionStatus() {
    this.selectAllOption.selected = this.currentFilteredOptions.every((option) => option.selected);
  }

  private filter(filter: string): TableRow[] {
    this.filterString = filter;

    this.currentFilteredOptions =
      filter.length > 0
        ? this.options.filter((option) => {
            return (option[this.property] as string).toLowerCase().includes(filter.toLowerCase());
          })
        : this.options;

    this.updateSelectAllOptionStatus();

    return this.currentFilteredOptions;
  }
}
