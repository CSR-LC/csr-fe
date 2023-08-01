import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { EquipmentFilter, EquipmentFilterModalData } from '@app/catalog/models';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { BaseKind, PetSize } from '@app/management/models/management';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lc-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterModalComponent implements OnInit {
  headerTitle: string = 'Фильтры';
  petKindsLabel: string = 'Животное';
  petSizesLabel: string = 'Размер животного';
  clearFiltersButtonLabel: string = 'очистить фильтры';
  submitButtonLabel: string = 'показать товаров';

  filterForm = this.formBuilder.group({
    petKinds: this.formBuilder.array([]),
    petSizes: this.formBuilder.array([]),
    idealCondition: this.formBuilder.control(false),
  });

  petKinds: BaseKind[] | null = null;
  petSizes: PetSize[] | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: EquipmentFilterModalData,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<FilterModalComponent>,
  ) {
    this.petKinds = data.petKinds;
    this.petSizes = data.petSizes;
  }

  ngOnInit(): void {
    this.createPetKindsFormControls();
    this.createPetSizesFormControls();
    this.initFilterFormValue();
  }

  get petKindsFormArray() {
    return this.filterForm.get('petKinds') as FormArray;
  }

  get petSizesFormArray() {
    return this.filterForm.get('petSizes') as FormArray;
  }

  resetFilters(): void {
    this.filterForm.reset();
  }

  showEquipments(): void {
    const equipmentFilter: EquipmentFilter = {
      petKinds: this.selectedPetKindsIds,
      petSize: this.selectedPetSizesIds,
      technicalIssues: this.technicalIssues,
    };

    this.dialogRef.close(equipmentFilter);
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

  private createPetKindsFormControls(): void {
    this.petKinds?.forEach(() => this.petKindsFormArray.push(new FormControl(false)));
  }

  private createPetSizesFormControls(): void {
    this.petSizes?.forEach(() => this.petSizesFormArray.push(new FormControl(false)));
  }

  private initFilterFormValue(): void {
    const storedFormValue = this.data.equipmentFilterForm.model;
    storedFormValue && this.filterForm.patchValue(storedFormValue);
  }
}
