import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilterModuleComponent } from '../filter-module/filter-module.component';

@Component({
  selector: 'lc-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent implements OnInit {
  public counter?: number;

  constructor(private matDialog: MatDialog, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.counter = 0;
  }

  openModule() {
    let dialogRef = this.matDialog.open(FilterModuleComponent, {
      data: this.counter,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.counter = result;
      this.cd.detectChanges();
    });
  }
}
