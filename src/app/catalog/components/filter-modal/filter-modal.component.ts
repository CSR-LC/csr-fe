import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { EquipmentFilter, EquipmentFilterModalData } from '@app/catalog/models';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { BaseKind, PetSize } from '@app/management/models/management';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { filterModalLabels } from '@app/catalog/constants';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@shared/until-destroy/until-destroy';
import { CatalogController } from '@app/catalog/services';

@UntilDestroy
@Component({
  selector: 'lc-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterModalComponent implements OnInit {
  filterModalLabels = filterModalLabels;

  filterForm = this.formBuilder.group({
    petKinds: this.formBuilder.array([]),
    petSizes: this.formBuilder.array([]),
    idealCondition: this.formBuilder.control(false),
  });

  petKinds: BaseKind[] | null = null;
  petSizes: PetSize[] | null = null;
  count: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: EquipmentFilterModalData,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<FilterModalComponent>,
    private readonly controller: CatalogController,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.petKinds = this.data.petKinds;
    this.petSizes = this.data.petSizes;
    this.petKinds && this.createCheckBoxFormControls<BaseKind>(this.petKinds, this.petKindsFormArray);
    this.petSizes && this.createCheckBoxFormControls<PetSize>(this.petSizes, this.petSizesFormArray);
    this.initFilterFormValue();

    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() => this.controller.getPrefilteredEquipmentCount(this.equipmentFilter)),
        untilDestroyed(this),
      )
      .subscribe((count) => {
        this.count = count;
        this.cdr.markForCheck();
      });
  }

  get petKindsFormArray(): FormArray {
    return this.filterForm.get('petKinds') as FormArray;
  }

  get petSizesFormArray(): FormArray {
    return this.filterForm.get('petSizes') as FormArray;
  }

  resetFilters(): void {
    this.filterForm.reset();
  }

  showEquipments(): void {
    this.dialogRef.close(this.equipmentFilter);
  }

  private get technicalIssues(): false | undefined {
    return this.filterForm.value.idealCondition ? false : undefined;
  }

  private get selectedPetKindsIds(): number[] {
    return this.filterForm.value.petKinds
      .map((checked: boolean, i: number) => (checked ? this.petKinds && this.petKinds[i]?.id : null))
      .filter((v: number) => v !== null);
  }

  private get selectedPetSizesIds(): number[] {
    return this.filterForm.value.petSizes
      .map((checked: boolean, i: number) => (checked ? this.petSizes && this.petSizes[i]?.id : null))
      .filter((v: number) => v !== null);
  }

  private createCheckBoxFormControls<T>(modelArray: T[], modelFormArray: FormArray): void {
    modelArray.forEach(() => modelFormArray.push(new FormControl(false)));
  }

  private initFilterFormValue(): void {
    const storedFormValue = this.data.equipmentFilterForm.model;
    storedFormValue && this.filterForm.patchValue(storedFormValue);
  }

  private get equipmentFilter(): EquipmentFilter {
    return {
      petKinds: this.selectedPetKindsIds,
      petSize: this.selectedPetSizesIds,
      technicalIssues: this.technicalIssues,
    };
  }
}
