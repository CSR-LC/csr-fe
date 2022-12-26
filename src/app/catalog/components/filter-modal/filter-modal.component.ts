import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Filter } from '@app/catalog/models/filter';

@Component({
  selector: 'lc-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterModalComponent implements OnInit {
  filterGroup!: FormGroup;
  subscription!: Subscription;

  petKinds = [1, 2, 3];
  petSizes = [1, 2, 3, 4];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Filter,
    private matDialogRef: MatDialogRef<FilterModalComponent>,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.filterGroup = this.fb.group({
      petKinds: this.fb.array(this.data.petKinds),
      petSizes: this.fb.array(this.data.petSizes),
      technicalIssues: this.fb.control(this.data.technicalIssues),
    });

    const checkboxControl = this.filterGroup.controls['petKinds'];
    this.subscription = checkboxControl.valueChanges.subscribe(() => {
      checkboxControl.setValue(
        checkboxControl.value.map((value: number | boolean, i: number) => (value ? this.petKinds[i] : false)),
        { emitEvent: false },
      );
    });
  }

  changeSelectedValue(event: MouseEvent, chip: MatChip) {
    const size = Number((<HTMLInputElement>event.target).getAttribute('data-size'));
    const control = this.filterGroup.get(`petSizes.${size - 1}`);
    if (!control) return;
    let value = control.value;
    if (value === false) value = size;
    else value = false;
    control.setValue(value);
    chip.toggleSelected();
  }

  filtersCounter() {
    const petKindsArr = this.filterGroup.controls['petKinds'].value;
    const petSizesArr = this.filterGroup.controls['petSizes'].value;
    const technicalIssuesArr = [this.filterGroup.controls['technicalIssues'].value];
    const mergeArray = [...petKindsArr, ...petSizesArr, ...technicalIssuesArr];
    return 8 - mergeArray.filter((item) => item === false).length;
  }

  closeModal() {
    this.data.petKinds = this.filterGroup.controls['petKinds'].value;
    this.data.petSizes = this.filterGroup.controls['petSizes'].value;
    this.data.technicalIssues = this.filterGroup.controls['technicalIssues'].value;
    this.data.counter = this.filtersCounter();
    this.matDialogRef.close(this.data);
  }
}
