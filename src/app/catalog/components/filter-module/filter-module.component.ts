import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lc-filter-module',
  templateUrl: './filter-module.component.html',
  styleUrls: ['./filter-module.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterModuleComponent implements OnInit {
  filterForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public counter: number,
    private matDialogRef: MatDialogRef<FilterModuleComponent>,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      petKind: this.formBuilder.group({
        cat: [false],
        dog: [false],
        bird: [false],
      }),
      size: this.formBuilder.group({
        universal: [false],
        small: [false],
        medium: [false],
        large: [false],
      }),
      condition: this.formBuilder.control(false),
    });
  }

  choose(event: MouseEvent, chip: MatChip) {
    const size = (<HTMLInputElement>event.target).getAttribute('data-size');
    if (!size) return;
    const control = this.filterForm.get(`size.${size}`);
    if (!control) return;
    const value = control.value;
    control.setValue(!value);
    chip.toggleSelected();
  }

  filtersCounter() {
    const petKindArray = Object.values(this.filterForm.value['petKind']);
    const sizeArray = Object.values(this.filterForm.value['size']);
    const conditionArray = [this.filterForm.value['condition']];
    const mergeArray = [...petKindArray, ...sizeArray, ...conditionArray];
    return mergeArray.filter((item) => item === true).length;
  }

  closeModule() {
    this.counter = this.filtersCounter();
    this.matDialogRef.close(this.counter);
  }
}
