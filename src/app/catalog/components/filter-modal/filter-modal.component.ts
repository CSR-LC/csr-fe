import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EquipmentFilter } from '@app/catalog/models';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ApplicationDataState } from '@shared/store/application-data';
import { BaseKind, PetSize } from '@app/management/models/management';
import { CatalogState } from '@app/catalog/store';
import { CatalogController } from '@app/catalog/services';

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
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly controller: CatalogController,
  ) {}

  ngOnInit(): void {
    this.petKinds = this.store.selectSnapshot(ApplicationDataState.petKinds);
    this.petSizes = this.store.selectSnapshot(ApplicationDataState.petSizes);
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
    this.controller.resetFilters();
  }

  showEquipments(): void {
    const selectedCategoryId = this.store.selectSnapshot(CatalogState.selectedCategoryId);
    const searchInput = this.store.selectSnapshot(CatalogState.searchInput);
    const equipmentFilter: EquipmentFilter = {
      category: selectedCategoryId,
      petKinds: this.selectedPetKindsIds,
      petSize: this.selectedPetSizesIds,
      name_substring: searchInput,
      technicalIssues: this.technicalIssues,
    };

    this.controller.equipmentFilter = equipmentFilter;
    this.controller.filterEquipment(equipmentFilter);
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
    const equipmentFilterForm = this.store.selectSnapshot(CatalogState.equipmentFilterForm);
    const storedFormValue = equipmentFilterForm?.model;

    if (storedFormValue) {
      this.filterForm.patchValue(storedFormValue);
    }
  }
}
