import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EquipmentFilter } from '@app/catalog/models';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ApplicationDataState } from '@shared/store/application-data';
import { BaseKind, PetSize } from '@app/management/models/management';

@Component({
  selector: 'lc-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterModalComponent {
  filterForm = this.formBuilder.group({
    petKinds: [[], [Validators.required]],
    petSizes: [[], [Validators.required]],
    equipmentCondition: [''],
  });

  petKinds: BaseKind[] | null = this.store.selectSnapshot(ApplicationDataState.petKinds);
  petSizes: PetSize[] | null = this.store.selectSnapshot(ApplicationDataState.petSizes);

  constructor(
    @Inject(MAT_DIALOG_DATA) public filter: EquipmentFilter,
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
  ) {}
}
