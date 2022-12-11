import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Filter } from '@app/catalog/models/filter';

@Component({
  selector: 'lc-catalog-filter',
  templateUrl: './catalog-filter.component.html',
  styleUrls: ['./catalog-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogFilterComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Filter,
    private matDialogRef: MatDialogRef<CatalogFilterComponent>
  ) {}

  ngOnInit(): void {}

 
  ngOnDestroy() {
    this.matDialogRef.close(this.data);
  }

  onClose() {
    this.matDialogRef.close();
  }

  onChange(event: any) {
    console.log(event.source.id);
    if (event.source.id == 1) {
      if (event.checked == true) {
        this.data.counter++;
        this.data.checkboxCat = true;
      } else {
        this.data.counter--;
        this.data.checkboxCat = false;
      }
    }
    if (event.source.id == 2) {
      if (event.checked == true) {
        this.data.counter++;
        this.data.checkboxDog = true;
      } else {
        this.data.counter--;
        this.data.checkboxDog = false;
      }
    }
    if (event.source.id == 3) {
      if (event.checked == true) {
        this.data.counter++;
        this.data.checkboxBird = true;
      } else {
        this.data.counter--;
        this.data.checkboxBird = false;
      }
    }
    if (event.source.id == 10) {
      if (event.checked == true) {
        this.data.counter++;
        this.data.slideIdealCondition = true;
      } else {
        this.data.counter--;
        this.data.slideIdealCondition = false;
      }
    }
  }

  onClick(event: any) {
    if (event.target.id == 4) {
      this.data.size160x170 = !this.data.size160x170;
      if (this.data.size160x170) this.data.counter++;
      if (!this.data.size160x170) this.data.counter--;
    }
    if (event.target.id == 5) {
      this.data.size60x120 = !this.data.size60x120;
      if (this.data.size60x120) this.data.counter++;
      if (!this.data.size60x120) this.data.counter--;
    }
    if (event.target.id == 6) {
      this.data.size60x50 = !this.data.size60x50;
      if (this.data.size60x50) this.data.counter++;
      if (!this.data.size60x50) this.data.counter--;
    }
    if (event.target.id == 7) {
      this.data.size60x70 = !this.data.size60x70;
      if (this.data.size60x70) this.data.counter++;
      if (!this.data.size60x70) this.data.counter--;
    }
    if (event.target.id == 8) {
      this.data.size60x60 = !this.data.size60x60;
      if (this.data.size60x60) this.data.counter++;
      if (!this.data.size60x60) this.data.counter--;
    }
    if (event.target.id == 9) {
      this.data.size50x50 = !this.data.size50x50;
      if (this.data.size50x50) this.data.counter++;
      if (!this.data.size50x50) this.data.counter--;
    }
    if (event.target.id == 11) {
      this.data.sortByAlphabet = !this.data.sortByAlphabet;
      if (this.data.sortByAlphabet && !this.data.sortBySize) {
        this.data.counter++;
      }
      if (this.data.sortByAlphabet) this.data.sortBySize = false;
      if (!this.data.sortByAlphabet) this.data.counter--;
    }
    if (event.target.id == 12) {
      this.data.sortBySize = !this.data.sortBySize;
      if (this.data.sortBySize && !this.data.sortByAlphabet) {
        this.data.counter++;
      }
      if (this.data.sortBySize) this.data.sortByAlphabet = false;
      if (!this.data.sortBySize) this.data.counter--;
    }
  }
}
