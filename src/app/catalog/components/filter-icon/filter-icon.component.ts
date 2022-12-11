import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogFilterComponent } from '../catalog-filter/catalog-filter.component';
import { Filter } from '@app/catalog/models/filter';

@Component({
  selector: 'lc-filter-icon',
  templateUrl: './filter-icon.component.html',
  styleUrls: ['./filter-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterIconComponent implements OnInit {
  public data: Filter = {
    counter: 0,
    checkboxCat: false,
    checkboxDog: false,
    checkboxBird: false,
    size160x170: false,
    size60x120: false,
    size60x50: false,
    size60x70: false,
    size60x60: false,
    size50x50: false,
    slideIdealCondition: false,
    sortByAlphabet: false,
    sortBySize: false,
  };

  constructor(private matDialog: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  onOpenFilter() {
    let dialogRef = this.matDialog.open(CatalogFilterComponent, {
      data: this.data,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.data = result;
      this.cd.detectChanges();
    });
  }
}
