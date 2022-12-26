import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { CatalogController } from '../../services';
import { Filter } from '@app/catalog/models/filter';

@Component({
  selector: 'lc-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  public data!: Filter;

  constructor(private matDialog: MatDialog, private controller: CatalogController, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.data = {
      petKinds: [false, false, false],
      petSizes: [false, false, false, false],
      technicalIssues: false,
      counter: 0,
    };
  }

  openModal() {
    let dialogRef = this.matDialog.open(FilterModalComponent, {
      data: this.data,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.data = result;
      this.cd.detectChanges();
    });
  }
}
