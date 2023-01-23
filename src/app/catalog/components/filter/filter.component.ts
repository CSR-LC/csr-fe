import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { CatalogController } from '../../services';
import { FilterValue, FilterData } from '@app/catalog/models/filter';

@Component({
  selector: 'lc-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  filterValue: FilterValue = {
    petKinds: [],
    petSize: [],
    technicalIssues: false,
  };
  filterData!: FilterData;
  selectedFilters!: number;

  constructor(private matDialog: MatDialog, private controller: CatalogController, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.filterData = { filterValue: this.filterValue };
  }

  openModal() {
    let dialogRef = this.matDialog.open(FilterModalComponent, {
      data: this.filterData,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.filterData.filterValue = result;
      this.filtersCounter();
      this.cd.markForCheck();
    });
  }

  filtersCounter() {
    this.selectedFilters = 0;
    if (this.filterData.filterValue['petKinds'].length > 0) this.selectedFilters++;
    if (this.filterData.filterValue['petSize'].length > 0) this.selectedFilters++;
    if (this.filterData.filterValue['technicalIssues'] === true) this.selectedFilters++;
  }
}
