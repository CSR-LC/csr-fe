import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { FilterData, FilterValue, EquipmentFilter } from '@app/shared/types';
import { DataService } from '@app/shared/services/data/data.service';

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

  constructor(private matDialog: MatDialog, private cd: ChangeDetectorRef, private dataService: DataService) {}

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
      this.dataService.updateData(result, this.selectedFilters);
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
